const mongoose = require("mongoose");

// DB
// 1- Create Schema 
const categorySchema = new mongoose.Schema( 
    {
      name: {
        type: String,
        required: [true, 'Category required'],
        unique: [true, 'Category must be unique'],
        minlength: [3, 'To short category name'],
        maxlength: [32, 'To long category name'],
      },
      // category name = A and B => a-and-b --> url as : shoping.com/a-and-b
      slug: {
        type: String,
        lowercase: true,
      },
      image: String,
    },
    { timestamps: true }
);

// set URL of all Images
const setImageURL = (doc) => {
  // doc --> هو العنصر الواحد داخل جدول الداتابيز
  if (doc.image) {
    // لو الصورة already URL كامل → سيبها
    if (doc.image.startsWith('http')) return;

    // غير كده ضيفي الـ base URL
    // return image base url + image name
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};

/*
mongoose middlewares: (تجعل رابط الصورة يظهر للمستخدم دون حفظه في الداتابيز)
'init' --> تجعل رابط الصورة يظهر قبل ان تتم عمليه التعديل في الداتابيز
'save' --> تجعل رابط الصورة يظهر قبل ان تتم عمليه حفظ الكاتيجوري في الداتابيز
*/
// findOne, findAll and update
categorySchema.post('init', (doc) => {
  setImageURL(doc);
});

// create
categorySchema.post('save', (doc) => {
  setImageURL(doc);
});



// 2- Create Model of Schema
//  mongoose.model(model name , Schema name)
const categoryModel = mongoose.model("category" , categorySchema); 

module.exports = categoryModel;

/* 
عند كتابة 
const categorySchema = new mongoose.Schema(
  { ... },
  { timestamps: true }
);


Mongoose تلقائيًا يعمل:
{
  createdAt: Date, // وقت إنشاء الدوكيومنت
  updatedAt: Date  // آخر وقت تم فيه التعديل
}


مثال عملي 📌
عند إنشاء Category جديدة
{
  _id: "65fabc...",
  name: "Electronics",
  slug: "electronics",
  image: "img.png",
  createdAt: "2026-01-06T07:20:15.123Z",
  updatedAt: "2026-01-06T07:20:15.123Z"
}


⚠️ createdAt لا يتغير
✅ updatedAt يتغير تلقائيًا مع كل تعديل 
*/