const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'name required'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'email required'],
      unique: true,
      lowercase: true,
    },

    phone: String,

    profileImg: String,

    password: {
      type: String,
      required: [true, 'password required'],
      minlength: [6, 'Too short password'],
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    
    role: {
      type: String,
      enum: ['user', 'manager', 'admin'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


// mongoose Middleware
userSchema.pre('save' , async function (){  // ممنوع استخدام ارو فنشن لاننا استخدمنا this
  if(! this.isModified('password') ) return;    //return next();  // اذا لم يتم التعديل على كلمة المرور فلا تفعل شيء و اخرج من الدالة
  // hashing user password
  this.password = await bcrypt.hash(this.password , 12);  // 12 --> مستوى قوة التشفير
  //next();
})

/*
⚠️ القاعدة المهمة جدًا
الحالة	تستخدم ايه
async/await	❌ بدون next
next()	❌ بدون async
*/


const User = mongoose.model('User', userSchema);

module.exports = User;