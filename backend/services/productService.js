/*
const slugify = require("slugify");
const ApiError = require("../utility/apiError");
const apiFeatures = require("../utility/apiFeatures");
*/
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const {uploadMixOfImages} = require("../midelewares/uploadImageMiddleware");
const productModel = require("../models/productModel");
const factory =  require("./handlersFactory");


exports.uploadProductImages = uploadMixOfImages([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 5,
  },
]);

exports.resizeProductImages = asyncHandler( async(req, res, next) => {
  //console.log(req.files);
  //1- Image processing for imageCover
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    // Save image into our db
    req.body.imageCover = imageCoverFileName;
  }
  //2- Image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);

        // Save image into our db
        req.body.images.push(imageName);
      })
    );

    next();
  }
});



// @desc    Create product
// @route   POST  /api/v1/categories
// @access  Private
exports.createProduct = factory.createOne( productModel );


// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProduct = factory.getAll( productModel , modelName = "products" );
/*
exports.getProduct = asyncHandler( async (req , res)=>{
    // 1) BUILD THE QUERY
    const documentsCount = await productModel.countDocuments();
    //const apiFeature = new apiFeatures( mongooseQuery , queryObject )
    const apiFeature = new apiFeatures( productModel.find() , req.query ).pagination(documentsCount).filter().limitFields().sort().search("products");

    // populate فقط لو مفيش fields
    if (!req.query.fields) {
       apiFeature.mongooseQuery = apiFeature.mongooseQuery
        .populate({ path: 'category', select: 'name -_id' })
        .populate({ path: 'brand', select: 'name -_id' });
    }

    // 2) excute query
    const {mongooseQuery , paginatResult} = apiFeature;
    const products = await mongooseQuery;

    res.status(200).json({ results: products.length , paginatResult , data: products });
});
*/


// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getSpecificProduct = factory.getOne( productModel );
/*
exports.getSpecificProduct = asyncHandler( async (req , res , next)=>{
    const { id } = req.params;
    const product = await productModel.findById( id ).populate({ path: 'category' , select: 'name -_id' }) ;
    if( !product ){
        // res.status(404).json({ mesage: `no product for this id: ${id}`  });
        // create ApiError class send error details to errorMidleware
        return next( new ApiError(`no product for this id: ${id}` , 404) );
    }
    res.status(200).json( {data: product} );
});
*/


// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = factory.updateOne( productModel );


// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = factory.deleteOne( productModel );









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
exports.getProduct = asyncHandler( async (req , res)=>{
    // 1# pagination query
    const page = req.query.page * 1 || 1;
    const limit =req.query.limit * 1 || 2;
    const skipElement = (page - 1) * limit;

    // 2# filtring query
    const queryStringObject = { ...req.query };   // array include all query
    const excludeFields = ['page', 'sort', 'limit', 'fields', 'keyword'];  // array include specific query (pagination query)
    // delete all excludeFields (remove pagination fields) from queryStringObject  --> نفعل ذلك لنجعل queryStringObject تحتوي على اي كويري غير الموجودة في الاراي الاخر
    excludeFields.forEach( (field)=>{
        delete queryStringObject[field];
    });
    // applay filteration using [gte = greter than or equial(>=) , gt = greter than(>) , lte = less than or equial(<=) , lt = less than(<)]
    let queryStr = JSON.stringify(queryStringObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g , (match) => `$${match}`);  // /\b(gte|gt|lte|lt)\b/g  -> regular expression -> to search about (gte|gt|lte|lt)
    // convert string to object
    const queryObject = JSON.parse(queryStr);
    //console.log(queryObject)


    // 1) BUILD THE QUERY
    // Pagination & Execution
    let mongooseQuery = productModel.find(queryObject).skip(skipElement).limit(limit);

    // populate فقط لو مفيش fields
    if (!req.query.fields) {
      mongooseQuery = mongooseQuery
        .populate({ path: 'category', select: 'name -_id' })
        .populate({ path: 'brand', select: 'name -_id' });
    }

    
    // 3# sort filtring query
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');   // اذا اردنا التصنيف بناءا على شيئين مثل السعر و التقييم فاننا نكتب الشيءين و نضع بينهما فاصلة ثم هو يقوم باستبدال الفاصلة الى فراغ ليسطيع تنفيذهما
        mongooseQuery = mongooseQuery.sort( sortBy );
    }else{
        mongooseQuery = mongooseQuery.sort( '-createdAt' );  // سيعرض المنتجات من الاحدث الى الاقدم
    }

    // 4# get product with specific fields
    if(req.query.fields){
        const field = req.query.fields.split(',').join(' ');   // اذا اردنا عرض خصائص معينة للمنتج فاننا نكتب الشيءين و نضع بينهما فاصلة ثم هو يقوم باستبدال الفاصلة الى فراغ ليسطيع تنفيذهما
        mongooseQuery = mongooseQuery.select( field );
    }else{
        mongooseQuery = mongooseQuery.select( '-__v' );  // سيعرض المنتجات بدون هذا العنصر
    }

    
    // 5# search
    if(req.query.keyword){
        const query = {};
        query.$or = [
            {title: { $regex: req.query.keyword , $options: 'i' } },
            {description: { $regex: req.query.keyword , $options: 'i' } }
        ];

        mongooseQuery = mongooseQuery.find(query);
    }


    // 2) excute query
    const products = await mongooseQuery;

    res.status(200).json({ results: products.length , page , data: products });
});
*/