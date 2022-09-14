const { getListOfClasses } = require("../database/getListOfClasses");
const { getClassInfo } = require("../database/getClassInfo");
const { createClass } = require("../database/createClass");
const { addStudent } = require("../database/addStudent");
const { createAssignment } = require("../database/createAssignment");
const { getAssignmentMarks } = require("../database/getAssignmentMarks");

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

exports.get_assignment_marks = async function (req, res, next) {
  const assignmentInfo = await getAssignmentMarks(
    req.params.classID,
    req.params.assignmentID
  );
  res.json({ assignmentInfo });
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

exports.add_student_or_assignment = async function (req, res, next) {
  try {
    if (req.body.formType === "student") {
      await addStudent(
        req.body.studentID,
        req.body.firstName,
        req.body.lastName,
        req.params.classID,
        req.body.email
      );
      res.status(200).json(req.body);
    } else if (req.body.formType === "assignment") {
      await createAssignment(
        req.params.classID,
        req.body.assignmentName,
        req.body.totalMarks
      );
      res.status(200).json(req.body);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
