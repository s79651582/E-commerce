const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');
const bcrypt = require('bcryptjs');
const ApiError = require('../utility/apiError');
const userModel = require('../models/userModel');
const createToken = require('../utility/createToken');
const sendEmail = require('../utility/sendEmail');


// @desc    Signup
// @route   GET /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
  // 1- Create user
  const user = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // 2- Generate token
  const token = createToken(user._id);

  res.status(201).json({ data: user, token });
});


// @desc    Login
// @route   GET /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next)=>{
  // 1) check if password and email in the body (validation)
  // 2) check if user exist & check if password is correct
  const userDB = await userModel.findOne( {email: req.body.email} );
  const passwordDB = await bcrypt.compare( req.body.password, userDB.password );
  if(!userDB || !passwordDB){
    return next( new ApiError('Incorrect email or password', 401))
  }

  // 3) generate token
  const token = createToken(userDB._id);

  // Delete password from response

  // 4) send response to client side
  res.status(200).json({ data: userDB, token });
});


//authorization
// @desc   make sure the user is logged in
exports.protect = asyncHandler(async (req, res, next) => {
  //console.log(req.headers);

  // 1) Check if token exist, if exist get
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    //console.log(token);
  }
  if (!token) {
    return next(
      new ApiError('You are not login, Please login to get access this route' ,  401)
    );
  }

  // 2) Verify token (no change happens, no expired token)  -->   (يعني ما يزال في فترة 90 يوم التي حددناها له في الكونفيجريشن) يتحقق من انه لم يحدث أي تغيير (في كلمة المرور خاصة) لان هذا يغير التوكين، الرمز المميز غير منتهي الصلاحية
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //console.log(decoded);

  // 3) Check if user exists
  const currentUser = await userModel.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError('The user that belong to this token does no longer exist', 401)
    );
  }

  // 4) Check if user is active
  if (!currentUser.active) {
    return next(
      new ApiError('User is inactive. please activate your account..', 401)
    );
  }

  // 5) Check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000, 10      // نحول زمن تغيير كلمة المرور الى تيم ستانب 
    );
    // Password changed after token created (Error)  -->  هذا لمنع الهكر الذي حصل على توكين المستخدم ثم قام المستخدم بتغيير كلمة المرور حينها سيتم انشاء توكين جديد للمستخدم بينما يحاول الهكر الدخول بالتوكين القديم
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new ApiError('User recently changed his password. please login again..', 401)
      );
    }
  }

  req.user = currentUser;
  next();
});


exports.protectAllowInactive = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ApiError('You are not login', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const currentUser = await userModel.findById(decoded.userId);
  if (!currentUser) {
    return next(new ApiError('User not found', 401));
  }

  req.user = currentUser;
  next();
});


// @desc    Authorization (User Permissions)
exports.allowedTo = (...roles) =>    // (...roles) --> take parameter ['admin', 'manager'] from any Route as categoryRoute 
  asyncHandler(async (req, res, next) => {
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError('You are not allowed to access this route', 403)
      );
    }
    next();
});


// @desc    Forgot password
// @route   POST /api/v1/auth/forgotPassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user by email
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with that email ${req.body.email}`, 404)
    );
  }

  // 2) If user exist, Generate hash reset random 6 digits and save it in db
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();  // Generate reset random 6 digits
  const hashedResetCode = crypto.createHash('sha256')  // hash reset random 6 digits
                                .update(resetCode)
                                .digest('hex');

  // Save hashed password reset code into db
  user.passwordResetCode = hashedResetCode;

  // Add expiration time for password reset code (10 min)
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save();

  // 3) Send the reset code via email
  const message = `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset code (valid for 10 min)',
      message  // or   message: message
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();
    return next(new ApiError('There is an error in sending email', 500));
  }

  res.status(200).json({ status: 'Success', message: 'Reset code sent to email' });
});