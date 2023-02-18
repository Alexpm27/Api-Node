var userService = require("./userServices");

var createUserControllerFunc = async (req, res) => {
  try {
    console.log(req.body);
    var status = await userService.createUserDBService(req.body);
    console.log(status);

    if (status) {
      res.send({ status: true, message: "Usuario creado" });
    } else {
      res.send({ status: false, message: "Error creando usuario" });
    }
  } catch (err) {
    console.log(err);
  }
};

var loginUserControllerFunc = async (req, res) => {
  var result = null;
  try {
    result = await userService.loginuserDBService(req.body);
    if (result.status) {
      res.send({ status: true, message: result.msg });
    } else {
      res.send({ status: false, message: result.msg });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.msg });
  }
};

var findUserById = async (req, res) => {
  var result = null;
  try {
    console.log(req.params.id);
    result = await userService.findById(req.params.id);
    console.log(result);

    if (result.status) {
      res.send({ status: true, message: result.msg });
    } else {
      res.send({ status: false, message: "Usuario no extiste" });
    }
  } catch (err) {
    console.log(err);
  }
};
var deleteUserById = async (req, res) => {
  try {
    console.log(req.params.id);
    var status = await userService.deleteById(req.params.id);
    console.log(status);

    if (status) {
      res.send({ status: true, message: "Usuario eliminado" });
    } else {
      res.send({ status: false, message: "Usuario no extiste" });
    }
  } catch (err) {
    console.log(err);
  }
};

var deleteUserByEmail = async (req, res) => {
  try {
    console.log(req.params.email);
    var status = await userService.deleteByEmail(req.params.email);
    console.log(status);

    if (status) {
      res.send({ status: true, message: "Usuario eliminado" });
    } else {
      res.send({ status: false, message: "Usuario no extiste" });
    }
  } catch (err) {
    console.log(err);
  }
};

var listAllUsers = async (req, res) => {
    var result = null;
  try {

    result = userService.listAllUsers;

    console.log(result);

    if (result.status) {
      res.send({ status: true, message: result.msg });
    } else {
      res.send({ status: false, message: "Usuario no extiste" });
    }


  } catch (error) {

  }
};

module.exports = {
  createUserControllerFunc,
  loginUserControllerFunc,
  findUserById,
  deleteUserById,
  deleteUserByEmail,
  listAllUsers
};
