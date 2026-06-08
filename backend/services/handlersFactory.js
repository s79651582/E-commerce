const asyncHandler = require("express-async-handler");
const ApiError = require("../utility/apiError");
const apiFeatures = require("../utility/apiFeatures");

exports.createOne = ( Model ) => {
    return asyncHandler( async (req , res , next)=>{
        const allContent = req.body;

        const document = await Model.create( allContent );

        document.save();
        res.status(201).json({ data: document });
    });
}

/*
exports.getAll = ( Model , modelName = '' ) => {
    return asyncHandler( async (req , res , next)=>{
        // filter
        let filter = {};
        if(req.filterObj){
            filter = req.filterObj;
        }

        // 2) search keyword
        if (req.query.keyword) {
        
            if (modelName === "products") {
                filter.$or = [
                    { title: { $regex: req.query.keyword, $options: "i" } },
                    { description: { $regex: req.query.keyword, $options: "i" } }
                ];
            } else {
                filter.name = { $regex: req.query.keyword, $options: "i" };
            }
        }

        // 1) build query
        const documentsCount = await Model.countDocuments(filter);
        //const apiFeature = new apiFeatures( mongooseQuery , queryObject )
        const apiFeature = new apiFeatures( Model.find(filter) , req.query ).pagination(documentsCount).filter().limitFields().sort().search(modelName);
    
        // 2) excute query
        const {mongooseQuery , paginatResult} = apiFeature;
        const document = await mongooseQuery;
    
        res.status(200).json({ totalResults: documentsCount, paginationOfResults: document.length , paginatResult , data: document });
    });
}
*/


exports.getAll = ( Model , modelName = '' ) => {
    return asyncHandler( async (req , res , next)=>{
        // 1) filter
        // الفلتر الأساسي (مثل الـ nested routes لو موجود)
        let filter = {};
        if(req.filterObj){
            filter = req.filterObj;
        }

        // 2) search keyword
        if (req.query.keyword) {
            if (modelName === "products") {
                filter.$or = [
                    { title: { $regex: req.query.keyword, $options: "i" } },
                    { description: { $regex: req.query.keyword, $options: "i" } }
                ];
            } else {
                filter.name = { $regex: req.query.keyword, $options: "i" };
            }
        }

        // 1) build query
        // 1) إنشاء استعلام خاص بالـ count لتطبيق الفلاتر عليه (بدون pagination)
        const countFeature = new apiFeatures(Model.find(filter), req.query)
            .filter() // تشغيل ميثود الفلترة الخاصة بالأقسام وغيرها
            .search(modelName);

        // حساب العدد الفعلي بعد الفلترة
        const documentsCount = await countFeature.mongooseQuery.countDocuments();

        // 2) بناء الاستعلام الأساسي للبيانات (مع الـ pagination وباقي الميزات)
        const apiFeature = new apiFeatures( Model.find(filter) , req.query )
            .filter()
            .sort()
            .limitFields()
            .search(modelName)
            .pagination(documentsCount); // نمرر العدد الفعلي هنا
    
        // 2) excute query
        // 3) تنفيذ استعلام البيانات
        const { mongooseQuery, paginatResult } = apiFeature;
        const document = await mongooseQuery;
    
        res.status(200).json({ 
            totalResults: documentsCount, // الآن سيعطيك عدد منتجات القسم المختار فقط
            paginationOfResults: document.length, 
            paginatResult, 
            data: document 
        });
    });
}


exports.getOne = ( Model ) => {
    return asyncHandler( async (req , res , next)=>{
        const { id } = req.params;

        const document = await Model.findById( id );
        
        if( !document ){
            return next( new ApiError(`no document for this id: ${id}` , 404) );
        }
        res.status(200).json({ data: document });
    });
}


exports.updateOne = ( Model ) => {
    return asyncHandler( async (req , res , next)=>{
        const { id } = req.params;
        const allContent = req.body;

        const document = await Model.findByIdAndUpdate( id , allContent , {
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
}


exports.deleteOne = ( Model ) => {
    return asyncHandler( async (req , res , next)=>{
        const { id } = req.params;

        const document = await Model.findByIdAndDelete( id );
        
        if( !document ){
            // res.status(404).json({ mesage: `no product for this id: ${id}`  });
            // create ApiError class send error details to errorMidleware
            return next( new ApiError(`no document for this id: ${id}` , 404) );
        }
        res.status(204).send();
    });
}
