const UserModel = require('../Models/UserSchema');
const bcryptjs = require('bcryptjs');

class DBManager {
  async getEntity () {
    const users = await UserModel.find();
    return await users
  }

  async getOneEnity (query) {
    const user = await UserModel.findOne(query);
    const result = await user;
    return result;
  }

  async addEntity (...data) {
    const [email, username, password, role, token] = data;
    const newUser = await new UserModel({
      email,
      username,
      password,
      role,
      token
    });
    // TODO: hash password befor saving it!!
    const savedUser = await newUser.save();
    const result = await savedUser;
    return result;
  }

  async editEntity (query, ...data) {
    const [email, username, password, role, token] = data;
    const user = await UserModel.findOneAndUpdate(query, {
      email,
      username,
      password,
      role,
      token
    });
    const result = await user;
    return result;
  }

  async deleteEntity (query) {
    const user = await UserModel.findOneAndDelete(query);
    const result = await user;
    return result;
  }
}

module.exports = DBManager;