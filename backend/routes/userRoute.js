const express = require("express");

const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  updateLoggedUserValidator,
  changeUserPasswordValidator,
  changeLoggedUserPasswordValidator,
  deleteUserValidator
} = require('../utility/validators/userValidator');

const { 
  createUser, 
  getUser, 
  getSpecificUser,
  updateUser,
  changeUserPassword,
  deleteUser,
  uploadUserImage,
  resizeImage,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
  activeLoggedUser
} = require("../services/userService");

const authService = require('../services/authService');

const router = express.Router();


router.get('/getMe', authService.protect, getLoggedUserData, getSpecificUser);
router.put('/changeMyPassword', authService.protect, changeLoggedUserPasswordValidator, updateLoggedUserPassword);
router.put('/updateMe', authService.protect, updateLoggedUserValidator, updateLoggedUserData);
router.delete('/deleteMe', authService.protect, deleteLoggedUserData);
router.put('/activeMe', authService.protectAllowInactive, activeLoggedUser);

// Admin
router.put("/changePassword/:id" , changeUserPasswordValidator, changeUserPassword);

router.route('/').post(authService.protect, authService.allowedTo('admin'), uploadUserImage,  resizeImage, createUserValidator, createUser)
      .get(authService.protect, authService.allowedTo('admin', 'manager'), getUser);
router.route('/:id')
      .get(authService.protect, authService.allowedTo('admin'), getUserValidator, getSpecificUser)
      .put(authService.protect, authService.allowedTo('admin'), uploadUserImage,  resizeImage, updateUserValidator, updateUser)
      .delete(authService.protect, authService.allowedTo('admin'), deleteUserValidator, deleteUser);



module.exports = router;