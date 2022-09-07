const { getListOfClasses } = require("../database/getListOfClasses");
const { getClassInfo } = require("../database/getClassInfo");
const { createClass } = require("../database/createClass");
const { addStudent } = require("../database/addStudent");

exports.welcome = function (req, res, next) {
  res.json({ message: "Hello and welcome to the backend server." });
};

exports.view_classes = async function (req, res, next) {
  const classList = await getListOfClasses(req.params.userID);
  res.json({ classList });
};

exports.get_class_info = async function (req, res, next) {
  const classInfo = await getClassInfo(req.params.classID);
  res.json({ classInfo });
};

exports.create_class = function (req, res, next) {
  try {
    createClass(
      req.params.userID,
      req.body.nameOfNewClass,
      req.body.selectedIcon
    );
    res.status(200).json({
      nameOfNewClass: req.body.nameOfNewClass,
      icon: req.body.selectedIcon,
      user: req.params.userID,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.add_student_or_assignment = function (req, res, next) {
  if (req.body.formType === "student") {
    addStudent(
      req.body.studentID,
      req.body.firstName,
      req.body.lastName,
      req.params.classID,
      req.body.email
    );
  }
  res.status(200).json(req.body);
};
