const { getClasses } = require("../database/getClasses");

exports.welcome = function (req, res, next) {
  res.json({ message: "Hello and welcome to the backend server." });
};

exports.view_classes = async function (req, res, next) {
  const classList = await getClasses(req.params.userID);
  res.json({ classList });
};

exports.create_class = function (req, res, next) {
  res.json({ message: "Create a new class." });
};

exports.class_info = function (req, res, next) {
  res.json({ message: "Class information." });
};
