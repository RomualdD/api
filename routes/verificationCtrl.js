var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');

module.exports = {
  getVerification: function(req, res) {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
      return res.status(400).json({'error': 'Token non valide'});
    }

    models.verification.findOne({
      attributes: ['verification', 'one_hour','two_hour','three_hour','four_hour','notification','verification_date'],
      where: { id_pbvhfjt_users: userId }
    }).then(function(verification) {
      if(verification) {
        res.status(201).json(verification);
      }
    }).catch(function(err) {
      res.status(500).json({'error': 'Impossible de trouver la préférence'});
    });
  },

  addVerification: function(req, res) {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
      return res.status(400).json({'error': 'Token non valide'});
    }

    models.verification.create({
      verification: req.body.verification,
      one_hour: req.body.one_hour,
      two_hour: req.body.two_hour,
      three_hour: req.body.three_hour,
      four_hour: req.body.four_hour,
      notification: req.body.notification,
      verification_date: req.body.verification_date,
      id_pbvhfjt_users: userId
    }).then(function(newVerification) {
      return res.status(201).json(newVerification)
    }).catch(function(err) {
      return res.status(500).json({'error': 'Impossible d\'enregistrer la vérification'})
    })
  }
}
