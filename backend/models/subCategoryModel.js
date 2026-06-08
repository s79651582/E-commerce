const mongoose = require("mongoose");

// DB
// 1- Create Schema 
const subCategorySchema = new mongoose.Schema( 
    {
        name: {
          type: String,
          required: [true, 'subCategory required'],
          unique: [true, 'subCategory must be unique'],
          minlength: [2, 'To short subCategory name'],
          maxlength: [32, 'To long subCategory name'],
        },
        // category name = A and B => a-and-b --> url as : shoping.com/a-and-b
        slug: {
          type: String,
          lowercase: true,
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'category',
            required: [true , 'subCategory must be belong to parent category']
        }
    },
    { timestamps: true }
);

// 2- Create Model of Schema
//  mongoose.model(model name , Schema name)
const subCategoryModel = mongoose.model("subCategory" , subCategorySchema); 

module.exports = subCategoryModel;