const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const subCategoryModel = require("../models/subCategoryModel");
const ApiError = require("../utility/apiError");
const apiFeatures = require("../utility/apiFeatures");
const factory =  require("./handlersFactory");


// GET /api/v1/categories/:categoryId/subcategories
// create subcategories under specific category
exports.setCategoryIdToBody = (req, res, next) => {
  // Nested route
  if (!req.body.category){  // req.body.category  --> المقصود بها اي دي الكاتيجوري الذي نرسله في اوبجيكت مع الاسم في بوست مان
    req.body.category = req.params.categoryId;   // req.params.categoryId  --> المقصود بها اي دي الكاتيجوري الذي نضعه في رابط البوست في بوست مان
  } 
  next();
};


exports.createSubCategory = factory.createOne( subCategoryModel );
/*
exports.createSubCategory = asyncHandler( async (req , res)=>{
    const {name, category} = req.body;    // or  const name = req.body.name;  
    const subCategory = await subCategoryModel.create({
        name, 
        slug: slugify(name),
        category
    });
    res.status(201).json( {data: subCategory} );
});
*/


// Nested route
// find subcategories of specific category
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  // if defined categoryId this condition is execute   and   if not defined categoryId this condition is not execute
  if (req.params.categoryId){
    filterObject = { category: req.params.categoryId };
  } 
  req.filterObj = filterObject;
  next();
};

/*
exports.getSubCategory = asyncHandler( async (req , res)=>{
  // 1) BUILD THE QUERY
  const documentsCount = await subCategoryModel.countDocuments();
  //const apiFeature = new apiFeatures( mongooseQuery , queryObject )
  const apiFeature = new apiFeatures( subCategoryModel.find(req.filterObj) , req.query ).pagination(documentsCount).filter().limitFields().sort().search();
  
  // 2) excute query
  const {mongooseQuery , paginatResult} = apiFeature;
  const subCategories = await mongooseQuery;
  res.status(200).json({ results: subCategories.length , paginatResult , data: subCategories });
});
*/
exports.getSubCategory = factory.getAll( subCategoryModel );


exports.getSpecificSubCategory = factory.getOne( subCategoryModel );


exports.updateSubCategory = factory.updateOne( subCategoryModel );
/*
exports.updateSubCategory = asyncHandler( async (req , res , next)=>{
    const { id } = req.params;
    const { name, category } = req.body;

    const subCategory = await subCategoryModel.findByIdAndUpdate( 
        { _id: id },                         // نحتاجه للبحث عن المنتج
        { name , slug: slugify(name) , category },      //or  category: category
        { new: true }                        // لكي يعرض البياانات بعد التعديل و اذا لم نضعه سيعرض البيانات قبل التعديل
    );

    if( !subCategory ){
        // res.status(404).json({ mesage: `no category for this id: ${id}`  });
        // create ApiError class send error details to errorMidleware
        return next( new ApiError(`no subCategory for this id: ${id}` , 404) );
    }
    res.status(200).json( {data: subCategory} );
});
*/


exports.deleteSubCategory = factory.deleteOne( subCategoryModel );