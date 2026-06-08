// For admins only --> CRUD user (create , update , search , delete)
const { v4: uuidv4 } = require('uuid');
const sharp = require("sharp");
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const userModel = require("../models/userModel");
const factory =  require("./handlersFactory");
const ApiError = require('../utility/apiError');
const { uploadSingleImage } = require('../midelewares/uploadImageMiddleware');
const createToken = require('../utility/createToken');



// Upload single image
exports.uploadUserImage = uploadSingleImage('profileImg');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {

  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;   //user-${id}-${Date.now()}.jpeg

  if(req.file){
    // sharp -> to provide buffer in memory storage
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${filename}`);
    
    // Save image name into our db
    req.body.profileImg = filename;
    
    // Save image url into our db
    //req.body.profileImg = req.hostname + filename;
  }

  next();
});


// @desc    Create Users
// @route   POST  /api/v1/users
// @access  Private
exports.createUser = factory.createOne( userModel );


// @desc    Get list of Users
// @route   GET /api/v1/users
// @access  Private
exports.getUser = factory.getAll( userModel );


// @desc    Get specific User by id
// @route   GET /api/v1/users/:id
// @access  Private
exports.getSpecificUser = factory.getOne( userModel );


// @desc    Update specific User
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = asyncHandler( async (req , res , next)=>{
    //const { id } = req.params;
    //const allContent = req.body;
    const document = await userModel.findByIdAndUpdate( req.params.id, {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImg: req.body.profileImg,
      role: req.body.role,
      new: true      // لكي يعرض البياانات بعد التعديل و اذا لم نضعه سيعرض البيانات قبل التعديل
    });
    
    if( !document ){
      // res.status(404).json({ mesage: `no product for this id: ${id}`  });
      // create ApiError class send error details to errorMidleware
      return next( 
          new ApiError(`no document for this id: ${id}` , 404)
      );
    }
    
    // Trigger "save" event when update document
    document.save();
    res.status(200).json({ data: document });
});


exports.changeUserPassword = asyncHandler( async (req , res , next)=>{
    //const { id } = req.params;
    //const allContent = req.body;
    const document = await userModel.findByIdAndUpdate( req.params.id, 
      {
        password: await bcrypt.hash(req.body.password , 12),
        passwordChangedAt: Date.now()   // تاريخ تعديل كلمة المرور
      },
      {
        new: true
      }
    );
    
    if( !document ){
      // res.status(404).json({ mesage: `no product for this id: ${id}`  });
      // create ApiError class send error details to errorMidleware
      return next( 
        new ApiError(`no document for this id: ${id}` , 404)
      );
    }
    
    // Trigger "save" event when update document
    document.save();
    res.status(200).json({ data: document });
});


// @desc    Delete specific User
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = factory.deleteOne( userModel );


// @desc    Get Logged user data
// @route   GET /api/v1/users/getMe
// @access  Private/Protect
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});


// @desc    Update logged user password
// @route   PUT /api/v1/users/updateMyPassword
// @access  Private/Protect
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  // 1) Update user password based user payload (req.user._id)
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  // 2) Generate token
  const token = createToken(user._id);

  res.status(200).json({ data: user, token });
});


// @desc    Update logged user data (without password, role)
// @route   PUT /api/v1/users/updateMe
// @access  Private/Protect
exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const updatedUser = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true }
  );

  res.status(200).json({ data: updatedUser });
});


// @desc    Deactivate logged user
// @route   DELETE /api/v1/users/deleteMe
// @access  Private/Protect
exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
  await userModel.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({ status: 'Success' });
});


// @desc    Deactivate logged user
// @route   PUT /api/v1/users/activeMe
// @access  Private/Protect
exports.activeLoggedUser = asyncHandler(async (req, res, next) => {
  await userModel.findByIdAndUpdate(req.user._id, { active: true });

  res.status(204).json({ status: 'Success' });
});