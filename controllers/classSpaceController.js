const { getListOfClasses } = require("../database/getListOfClasses");

exports.welcome = function (req, res, next) {
  res.json({ message: "Hello and welcome to the backend server." });
};

exports.view_classes = async function (req, res, next) {
  const classList = await getListOfClasses(req.params.userID);
  res.json({ classList });
};

exports.create_class = function (req, res, next) {
  res.json({
    nameOfNewClass: req.body.nameOfNewClass,
    icon: req.body.selectedIcon,
    user: req.params.userID,
  });
};

exports.class_info = function (req, res, next) {
  res.json({ message: "Class information." });
};
