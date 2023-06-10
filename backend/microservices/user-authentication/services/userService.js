const AWS = require("aws-sdk");

const cognito = new AWS.CognitoIdentityServiceProvider();

exports.create = async (params) => {
  return cognito.signUp(params).promise();
};

exports.verifyEmail = async (params) => {
  return cognito.confirmSignUp(params).promise();
};

exports.login = async (params) => {
  return cognito.initiateAuth(params).promise();
};

exports.updateUser = async (params) => {
  return cognito.updateUserAttributes(params).promise();
};

exports.getUser = async (params) => {
  return cognito.getUser(params).promise();
};

exports.signout = async (params) => {
  return cognito.globalSignOut(params).promise();
};

exports.deleteUser = async (params) => {
  return cognito.adminDeleteUser(params).promise();
};

exports.forgotPassword = async (params) => {
  return cognito.forgotPassword(params).promise();
};

exports.confirmPasswordReset = (params) => {
  return cognito.confirmForgotPassword(params).promise();
};
