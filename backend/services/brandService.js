/*
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utility/apiError");
const apiFeatures = require("../utility/apiFeatures");
*/
const brandModel = require("../models/brandModel");
const factory =  require("./handlersFactory");

const { v4: uuidv4 } = require('uuid');
const sharp = require("sharp");
const asyncHandler = require('express-async-handler');
const { uploadSingleImage } = require('../midelewares/uploadImageMiddleware');


// Upload single image
exports.uploadBrandImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {

  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;   //brand-${id}-${Date.now()}.jpeg

  // sharp -> to provide buffer in memory storage
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/brands/${filename}`);

  // Save image name into our db
  req.body.image = filename;

  // Save image url into our db
  //req.body.image = req.hostname + filename;

  next();
});


// @desc    Create Brands
// @route   POST  /api/v1/brands
// @access  Private
exports.createBrand = factory.createOne( brandModel );
/*
exports.createBrand = asyncHandler( async (req , res)=>{
    const name = req.body.name;     // or  const {name} = req.body;
    const brands = await brandModel.create( {name , slug: slugify(name)} ) ;
    res.status(201).json( {data: brands} );
});
*/


// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getBrand = factory.getAll( brandModel );
/*
exports.getBrand = asyncHandler( async (req , res)=>{
    // 1) BUILD THE QUERY
    const documentsCount = await brandModel.countDocuments();
    //const apiFeature = new apiFeatures( mongooseQuery , queryObject )
    const apiFeature = new apiFeatures( brandModel.find() , req.query ).pagination(documentsCount).filter().limitFields().sort().search();

    // 2) excute query
    const {mongooseQuery , paginatResult} = apiFeature;
    const brands = await mongooseQuery;

    res.status(200).json({ results: brands.length , paginatResult , data: brands });
});
*/


// @desc    Get specific Brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getSpecificBrand = factory.getOne( brandModel );
/*
exports.getSpecificBrand = asyncHandler( async (req , res , next)=>{
    const { id } = req.params;
    const brands = await brandModel.findById( id ) ;
    if( !brands ){
        // res.status(404).json({ mesage: `no Brands for this id: ${id}`  });
        // create ApiError class send error details to errorMidleware
        return next( new ApiError(`no Brands for this id: ${id}` , 404) );
    }
    res.status(200).json( {data: brands} );
});
*/


// @desc    Update specific Brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = factory.updateOne( brandModel );
/*
exports.updateBrand = asyncHandler( async (req , res , next)=>{
    const { id } = req.params;
    const { name } = req.body;

    const brands = await brandModel.findByIdAndUpdate( 
        { _id: id },                         // نحتاجه للبحث عن المنتج
        { name , slug: slugify(name) },      // الاسم هو البيانات الوحيدة المتاحة للتعديل
        { new: true }                        // لكي يعرض البياانات بعد التعديل و اذا لم نضعه سيعرض البيانات قبل التعديل
    );

    if( !brands ){
        // res.status(404).json({ mesage: `no Brands for this id: ${id}`  });
        // create ApiError class send error details to errorMidleware
        return next( new ApiError(`no Brands for this id: ${id}` , 404) );
    }
    res.status(200).json( {data: brands} );
});
*/


// @desc    Delete specific Brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = factory.deleteOne( brandModel );