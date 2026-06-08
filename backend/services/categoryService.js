/*
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utility/apiError");
const apiFeatures = require("../utility/apiFeatures");
*/
const { v4: uuidv4 } = require('uuid');
const sharp = require("sharp");
const categoryModel = require("../models/categoryModel");
const factory =  require("./handlersFactory");
const asyncHandler = require('express-async-handler');
const { uploadSingleImage } = require('../midelewares/uploadImageMiddleware');



// Upload single image
exports.uploadCategoryImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;   //category-${id}-${Date.now()}.jpeg

  // sharp -> to provide buffer in memory storage
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/categories/${filename}`);

  // Save image into our db
  req.body.image = filename;

  next();
});


// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createCategory = factory.createOne( categoryModel );


// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategory = factory.getAll( categoryModel );


// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getSpecificCategory = factory.getOne( categoryModel );


// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = factory.updateOne( categoryModel );


// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private factory
exports.deleteCategory = factory.deleteOne( categoryModel );
/*
exports.deleteCategory = asyncHandler( async (req , res , next)=>{
    const { id } = req.params;

    const category = await categoryModel.findByIdAndDelete( id );
    
    if( !category ){
        // res.status(404).json({ mesage: `no category for this id: ${id}`  });
        // create ApiError class send error details to errorMidleware
        return next( new ApiError(`no category for this id: ${id}` , 404) );
    }
    res.status(204).send();
});
*/






// --------------------------------------------------------------------------------------------------------

/*
exports.createCategory = async (req , res)=>{
    const name = req.body.name;
    try{
        const category = await categoryModel.create( {name , slug: slugify(name)} ) ;
        res.status(201).json( {data: category} );
    } catch(err){
        res.status(400).send(err);
    }
}
*/

/*
exports.getCategory = asyncHandler( async (req , res)=>{
    const page = req.query.page * 1 || 1;
    const limit =req.query.limit * 1 || 2;
    const skipElement = (page - 1) * limit;
    const categories = await categoryModel.find({}).skip(skipElement).limit(limit);
    res.status(200).json({ results: categories.length , page , data: categories });
});
*/