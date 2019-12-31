var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var verificationCtrl = require('./routes/verificationCtrl');
var appointmentCtrl = require('./routes/appointmentCtrl');

exports.router = (function() {
  var apiRouter = express.Router();

  apiRouter.route('/users/register/').post(usersCtrl.register);
  apiRouter.route('/users/login/').post(usersCtrl.login);
  apiRouter.route('/users/profil/').get(usersCtrl.getUserProfile);
  apiRouter.route('/users/profil/').put(usersCtrl.updateUserProfile);
  apiRouter.route('/verification/get/').get(verificationCtrl.getVerification);
  apiRouter.route('/verification/add/').post(verificationCtrl.addVerification);
  apiRouter.route('/appointment/add/').post(appointmentCtrl.addAppointment);
  apiRouter.route('/appointment/get/').get(appointmentCtrl.getAppointment);

  return apiRouter;
})();
