var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');

var QRCode = require('qrcode');

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

module.exports = {
  register: function(req, res) {
    var mail = req.body.mail;
    var lastname = req.body.lastname;
    var firstname = req.body.firstname;
    var password = req.body.password;
    var birthdate = req.body.birthdate;
    var phone = req.body.phone;
    var phone2 = req.body.phone2;
    var language = req.body.language;
    var keyverif = req.body.keyverif;
    var active = req.body.active;
    var qrcode = req.body.qrcode;
    var id_role = req.body.role;
    var id_pathology = req.body.pathology;

    if(lastname == null || firstname == null || mail == null || password == null) {
      return res.status(400).json({'error': 'Paramètres manquant.'});
    }

    if(!EMAIL_REGEX.test(mail)) {
      return res.status(400).json({'error': 'L\'adresse mail n\'est pas valide.'});
    }

  /*  if(!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({'error': 'password invalid'});
    }*/

    asyncLib.waterfall([
      function(done) {
        models.users.findOne({
          attributes: ['mail'],
          where: { mail: mail }
        }).then(function(userFound) {
          done(null, userFound);
        }).catch(function(err) {
          return res.status(500).json({ 'error': 'Impossible de vérifier l\'utilisateur'});
        })
      },
      function(userFound, done) {
        if(!userFound) {
          bcrypt.hash(password, 5, function(err, bcryptedPassword) {
            done(null, userFound, bcryptedPassword)
          });
        } else {
          return res.status(409).json({ 'error': 'L\'adresse mail est déjà utilisée'});
        }
      },
      function(userFound, bcryptedPassword, done) {
        var newUser = models.users.create({
          mail: mail,
          lastname: lastname,
          firstname: firstname,
          password: bcryptedPassword,
          birthdate: birthdate,
          phone: phone,
          phone2: phone2,
          language: language,
          keyverif: keyverif,
          active: active,
          qrcode: qrcode,
          id_pbvhfjt_role: id_role,
          id_pbvhfjt_pathology: id_pathology
        }).then(function(newUser) {
          done(null, newUser);
        }).catch(function(err) {
          return res.status(500).json({'error': 'Impossible d\'ajouter un utilisateur'})
        });
      },
      function(newUser, done) {
        console.log(newUser.dataValues.id);
        QRCode.toDataURL(newUser.dataValues.id.toString(), function (err, url) {
          console.log(url)
          newUser.update({
            qrcode: url
          }).then(function() {
            done(newUser);
          }).catch(function(err) {
            res.status(500).json({'error': 'Impossible d\'ajouter le qrcode'});
          });
        })
      }
    ], function(newUser) {
      if(newUser) {
        return res.status(201).json({'userId': newUser.id});
      } else {
        return res.status(500).json({'error': 'Impossible d\'ajouter un utilisateur'})
      }
    })
  },

  login: function(req, res) {
    var mail = req.body.mail;
    var password = req.body.password;

    if(mail == null || password == null) {
      return res.status(400).json({'error': 'Paramètres manquant'});
    }

    models.users.findOne({
      where: { mail: mail }
    }).then(function(userFound) {
      if(userFound) {
        bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
          if(resBycrypt) {
            return res.status(200).json({
              'userId': userFound.id,
              'token': jwtUtils.generateTokenForUser(userFound)
            })
          } else {
            return res.status(403).json({'error': 'Mot de passe invalide'});
          }
        })
      } else {
        return res.status(404).json({'error': 'L\'utilisateur n\'existe pas.'});
      }
    }).catch(function(err) {
      return res.status(500).json({'error': 'Impossible de vérifier l\'utilisateur'});
    })
  },

  getUserProfile: function(req, res) {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if(userId < 0) {
      return res.status(400).json({'error': 'Token non valide'});
    }

    models.users.findOne({
      attributes: ['id', 'mail',  'firstname', 'lastname', 'birthdate', 'phone', 'phone2', 'qrcode'],
      where: { id: userId }
    }).then(function(user) {
      if(user) {
        res.status(201).json(user);
      } else {
        res.status(401).json({'error': 'L\'utilisateur n\'existe pas.'});
      }
    }).catch(function(err) {
      res.status(500).json({'error': 'Impossible de trouver l\'utilisateur'});
    });
  },

  updateUserProfile: function(req, res) {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    var phone = req.body.phone;
    var phone2 = req.body.phone2;
    var mail = req.body.mail;

    asyncLib.waterfall([
      function(done) {
        models.users.findOne({
          attributes: ['id'],
          where: { id: userId}
        }).then(function(userFound) {
          done(null, userFound)
        }).catch(function(err) {
          return res.status(500).json({'error': 'unable to verify user'});
        });
      },
      function(userFound, done) {
        if(userFound) {
          userFound.update({
            phone: (phone ? phone : userFound.phone),
            phone2: (phone2 ? phone2 : userFound.phone2),
            mail: (mail ? mail : userFound.mail)
          }).then(function() {
            done(userFound);
          }).catch(function(err) {
            res.status(500).json({'error': 'cannot update user'});
          });
        } else {
          res.status(404).json({'error': 'user not found'});
        }
      }
    ], function(userFound) {
      if(userFound) {
        return res.status(201).json(userFound);
      } else {
        res.status(500).json({'error': 'cannot update user profile'});
      }
    }
  )

  }
}
