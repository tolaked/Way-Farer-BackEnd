const jwt = require('jsonwebtoken');

const Auth = {
  toAuthJSON(user) {
    return {
      id: user._id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      token: this.generateToken(user),
    };
  },

  generateToken(user) {
    const payload = {
      id: user._id,
      isAdmin: user.isAdmin,
    };

    const options = {
      expiresIn: '24h',
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, options);
    return token;
  },
};

module.exports = { Auth };
