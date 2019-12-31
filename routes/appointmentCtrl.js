var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');

module.exports = {
  addAppointment: function(req,res) {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
      return res.status(400).json({'error': 'Token non valide'});
    }

    models.appointments.create({
      title: req.body.title,
      date: req.body.date,
      hour: req.body.one_hour,
      additional_informations: req.body.additional_informations,
      id_pbvhfjt_users: userId
    }).then(function(newAppointment) {
      return res.status(201).json(newAppointment)
    }).catch(function(err) {
      return res.status(500).json({'error': 'Impossible d\'enregistrer le rendez-vous'})
    })
  },
  getAppointment: function(req, res) {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
      return res.status(400).json({'error': 'Token non valide'});
    }

    models.appointments.findAll({
      attributes: ['date', 'hour', 'additional_informations', 'title'],
      where: {
        id_pbvhfjt_users: userId
      }
    }).then(function(appointments) {
      res.status(201).json(appointments);
    }).catch(function(err) {
      return res.status(500).json({'error': 'Impossible de lire les rendez-vous'});
    })
  }

}
