const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: (user, secret, options) => {
    return jwt.sign(user, secret, options);
  },
  verifyToken: (token, secret, callback) => {
    jwt.verify(token, secret, (error, user) => {
      callback(user, error);
    });
  },
};
