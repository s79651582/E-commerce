const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product required'],
      unique: [true, 'Product must be unique'],
      trim: true,
      minlength: [3, 'Too short product title'],
      maxlength: [100, 'Too long product title'],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [20, 'Too short product description'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
    },
    sold: {   // عدد مرات البيع
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      trim: true,
      max: [200000, 'Too long product price'],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],

    imageCover: {
      type: String,
      required: [true, 'Product Image cover is required'],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'category',
      required: [true, 'Product must be belong to category'],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'subCategory',
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'brand',
    },
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating must be above or equal 1.0'],
      max: [5, 'Rating must be below or equal 5.0'],
    },
    ratingsQuantity: {  // عدد الاشخاص الذين قيموا المنتج
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Mongoose query middleware
productSchema.pre(/^find/, function () {  //   /^find/  --> any query of start (find)
  this.populate([
    { path: 'category', select: '_id name' },
    { path: 'brand', select: '_id name' },
  ]);
});


// set URL of all Images
const setImageURL = (doc) => {
  // doc --> هو العنصر الواحد داخل جدول الداتابيز
  if (doc.imageCover) {

    if (! doc.imageCover.startsWith('http')) {
      // غير كده ضيفي الـ base URL
      // return image base url + image name
      const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
      //console.log(imageUrl)
      doc.imageCover = imageUrl;
    }
  }

  if (doc.images && Array.isArray(doc.images)) {
    const imagesList = [];

    doc.images.forEach((img) => {
      // لو الصورة already URL كامل → سيبها
      if (img.startsWith('http')) {
        imagesList.push(img);
      }
      else{
        // غير كده ضيفي الـ base URL
        // return image base url + image name
        const imageUrl = `${process.env.BASE_URL}/products/${img}`;
        imagesList.push(imageUrl);
      }
    });
    
    //console.log(imagesList)
    doc.images = imagesList;
  }
};

/*const setImageURL = (doc) => {
  // doc --> هو العنصر الواحد داخل جدول الداتابيز
  if (doc.imageCover) {
    // return image base url + image name
    const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }
  if(doc.images){
    const imagesList = [];
    doc.images.forEach(img => {
      const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
      imagesList.push(imageUrl);
    });
    
    doc.images = imagesList;
  }
};*/



/*
mongoose middlewares: (تجعل رابط الصورة يظهر للمستخدم دون حفظه في الداتابيز)
'init' --> تجعل رابط الصورة يظهر قبل ان تتم عمليه التعديل في الداتابيز
'save' --> تجعل رابط الصورة يظهر قبل ان تتم عمليه حفظ المنتج في الداتابيز
*/
// findOne, findAll and update
productSchema.post('init', (doc) => {
  setImageURL(doc);
});

// create
productSchema.post('save', (doc) => {
  setImageURL(doc);
});


module.exports = mongoose.model('product', productSchema);