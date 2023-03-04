var userModel = require("./userModel");
var key = "somekey234567884456753456";
var encryptor = require("simple-encryptor")(key);

module.exports.createUserDBService = (userDetails) => {
  return new Promise(function myFn(resolve, reject) {
    var userModelData = new userModel();

    userModelData.firstname = userDetails.firstname;
    userModelData.lastname = userDetails.lastname;
    userModelData.email = userDetails.email;
    userModelData.password = userDetails.password;
    var encrypted = encryptor.encrypt(userDetails.password);
    userModelData.password = encrypted;

    userModelData.save(function resultHandle(error, result) {
      if (error) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports.loginuserDBService = (userDetails) => {
  return new Promise(function myFn(resolve, reject) {
    userModel.findOne(
      { email: userDetails.email },
      function getresult(errorvalue, result) {
        if (errorvalue) {
          reject({ status: false, msg: "invalid data" });
        } else {
          if (result != undefined && result != null) {
            var decrypted = encryptor.decrypt(result.password);

            if (decrypted == userDetails.password) {
              resolve({ status: true, msg: "Validated user" });
            } else {
              reject({ status: false, msg: "Failed to validate user" });
            }
          } else {
            reject({ status: false, msg: "Invalid user details" });
          }
        }
      }
    );
  });
};

module.exports.findById = (userId) => {
  return new Promise(function myFn(resolve, reject) {
    userModel.findById(userId, function (err, user) {
      if (err) {
        reject({ status: false, msg: "invalid data" });
      } else {
        if (user != undefined && user != null) {
          resolve({ status: true, msg: { user: user.firstname } });
        } else {
          resolve(false);
        }
      }
    });
  });
};

module.exports.deleteById = (userId) => {
  return new Promise(function myFn(resolve, reject) {
    userModel.findByIdAndDelete(userId, function (err, user) {
      if (err) {
        reject({ status: false, msg: "invalid data" });
      } else {
        if (user != undefined && user != null) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
};

module.exports.deleteByEmail = (userEmail) => {
  return new Promise(function myFn(resolve, reject) {
    userModel.findOneAndDelete(
      { email: userEmail },
      function result(err, user) {
        if (err) {
          reject({ status: false, msg: "invalid data" });
        } else {
          if (user != undefined && user != null) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      }
    );
  });
};

module.exports.listAllUsers = () => {
  return new Promise(function myFn(resolve, reject) {
    userModel.collection(function result(err, users) {
      if (err) {
        reject({ status: false, msg: "invalid data" });
      } else {
        if (users != undefined && users != null) {
          resolve({ status: true, msg: users });
        } else {
          resolve(false);
        }
      }
    });
  });
};


module.exports.updateById = (userId, newData) => {
  return new Promise(function myFn(resolve, reject) {
    userModel.findOneAndUpdate({ _id: userId },
    { $set: newData }, function result(err, users) {
      if (err) {
        resolve({ status: false, msg: "invalid data" });
      } else {
        if (users != undefined && users != null) {
          resolve({ status: true, msg: users });
        } else {
          resolve(false);
        }
      }
    });
  });
};