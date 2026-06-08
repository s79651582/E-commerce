
class apiFeatures{
    constructor(mongooseQuery , queryObject){
        this.mongooseQuery = mongooseQuery;
        this.queryObject = queryObject;
    }

    filter(){
        const queryStringObject = { ...this.queryObject };   // array include all query
        const excludeFields = ['page', 'sort', 'limit', 'fields', 'keyword'];  // array include specific query (pagination query)
        // delete all excludeFields (remove pagination fields) from queryStringObject  --> نفعل ذلك لنجعل queryStringObject تحتوي على اي كويري غير الموجودة في الاراي الاخر
        excludeFields.forEach( (field)=>{
            delete queryStringObject[field];
        });
        // applay filteration using [gte = greter than or equial(>=) , gt = greter than(>) , lte = less than or equial(<=) , lt = less than(<)]
        let queryStr = JSON.stringify(queryStringObject);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g , (match) => `$${match}`);  // /\b(gte|gt|lte|lt)\b/g  -> regular expression -> to search about (gte|gt|lte|lt)
        // convert string to object
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

        return this;
    }

    sort(){
        if(this.queryObject.sort){
            const sortBy = this.queryObject.sort.split(',').join(' ');   // اذا اردنا التصنيف بناءا على شيئين مثل السعر و التقييم فاننا نكتب الشيءين و نضع بينهما فاصلة ثم هو يقوم باستبدال الفاصلة الى فراغ ليسطيع تنفيذهما
            this.mongooseQuery = this.mongooseQuery.sort( sortBy );
        }else{
            this.mongooseQuery = this.mongooseQuery.sort( '-createdAt' );  // سيعرض المنتجات من الاحدث الى الاقدم
        }

        return this;
    }

    limitFields(){
        //get product with specific fields
        if(this.queryObject.fields){
            const field = this.queryObject.fields.split(',').join(' ');   // اذا اردنا عرض خصائص معينة للمنتج فاننا نكتب الشيءين و نضع بينهما فاصلة ثم هو يقوم باستبدال الفاصلة الى فراغ ليسطيع تنفيذهما
            this.mongooseQuery = this.mongooseQuery.select( field );
        }else{
            this.mongooseQuery = this.mongooseQuery.select( '-__v' );  // سيعرض المنتجات بدون هذا العنصر
        }

        return this;
    }

    search( modelName ){
        if(this.queryObject.keyword){
            let query = {};

            if(modelName === "products"){
                query.$or = [
                    { title: { $regex: this.queryObject.keyword , $options: 'i' } },
                    { description: { $regex: this.queryObject.keyword , $options: 'i' } }
                ];
            }else{
                query = { name: { $regex: this.queryObject.keyword , $options: 'i' } }
            }
            

            this.mongooseQuery = this.mongooseQuery.find(query);
        }

        return this;
    }

    pagination( documentsCount ){
        const page = this.queryObject.page * 1 || 1;
        const limit =this.queryObject.limit * 1 || 1000;
        const skipElement = (page - 1) * limit;
        const endIndex = page * limit;  // رقم اخر منتج في الصفحة الحالية  // example : page = 2 , limit = 10 -> endIndex = 2 * 10 = 20

        const paginat = {};
        paginat.currentPage = page;
        paginat.limit = limit;
        paginat.numberOfPages = Math.ceil( documentsCount / limit );   // numberOfPages = number of all products / limit (هو عدد المنتجات المسموح عرضه في الصفحة الواحدة)

        // next page
        if(endIndex < documentsCount){
            paginat.next = page + 1 ;
        }

        // previos page
        if(skipElement > 0){
            paginat.pev = page - 1 ;
        }

        this.mongooseQuery = this.mongooseQuery.skip(skipElement).limit(limit);
        this.paginatResult = paginat;

        return this;
    }

}

module.exports = apiFeatures;