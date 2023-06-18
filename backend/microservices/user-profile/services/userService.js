const User = require("../models/user");

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