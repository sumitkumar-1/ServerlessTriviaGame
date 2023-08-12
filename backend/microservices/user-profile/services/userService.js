const User = require("../models/user");
const axios = require("axios");
exports.save = async (params) => {
  const user = new User(params);
  return user.save();
};

exports.update = async (id, userData) => {
  return User.update(id, userData);
};

exports.get = async (id) => {
  return User.get(id);
};

exports.getCognitoUser = async (id) => {
  return await axios.get(`https://3k7qrzfb99.execute-api.us-east-1.amazonaws.com/getuserbyuserid/${id}`);
}