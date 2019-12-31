var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '0sjs60gs5zeae3qs588fefgt8qsx22x1v4ve68qs1csdgy2u3';

module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData.id,
      role: userData.id_pbvhfjt_role
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '1h'
    })
  },
  parseAuthorization: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: function(authorization) {
    var userId = -1;
    var token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if(jwtToken != null)
          userId = jwtToken.userId;
        } catch(err) {}
      }
      return userId;
    }
  }
