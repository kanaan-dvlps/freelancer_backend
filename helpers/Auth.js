const jwt = require('jsonwebtoken');
const ENV = require('../Configs/env');

class AuthController {
  
  static async token (user) {
    const token = await jwt.sign({user}, ENV.PRIVATE_KEY, { expiresIn: '90days' });
    const result = await token;
    return result;
  }

  static async verifyEndpoint (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== undefined) {
      const bearer = bearerHeader.split(' ');
      const [word, token] = bearer;
      const bearerToken = token;
      req.token = bearerToken;
      next();
    } else {
      res.status(403);
    }
  }

  static async varyfiToken (token) {
    const authData = await jwt.verify(token, ENV.PRIVATE_KEY);
    return await authData;
  }


}

module.exports = AuthController;