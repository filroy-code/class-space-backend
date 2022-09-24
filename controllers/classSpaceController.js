const { getListOfClasses } = require("../database/getListOfClasses");
const {
  getClassAssignmentInfo,
} = require("../database/getClassAssignmentInfo");
const { getClassStudentInfo } = require("../database/getClassStudentInfo");
const { createClass } = require("../database/createClass");
const { addStudent } = require("../database/addStudent");
const { createAssignment } = require("../database/createAssignment");
const { getAssignmentMarks } = require("../database/getAssignmentMarks");
const { inputMarks } = require("../database/inputMarks");

exports.welcome = function (req, res, next) {
  res.json({ message: "Hello and welcome to the backend server." });
};

exports.view_classes = async function (req, res, next) {
  const classList = await getListOfClasses(req.params.userID);
  res.json({ classList });
};

exports.get_class_assignment_info = async function (req, res, next) {
  const classInfo = await getClassAssignmentInfo(req.params.classID);
  res.json({ classInfo });
};

exports.get_class_student_info = async function (req, res, next) {
  const classInfo = await getClassStudentInfo(req.params.classID);
  res.json({ classInfo });
};

exports.get_assignment_marks = async function (req, res, next) {
  const assignmentInfo = await getAssignmentMarks(
    req.params.classID,
    req.params.assignmentID
  );
  res.json({ assignmentInfo });
};

exports.input_assignment_marks = async function (req, res, next) {
  try {
    const assignmentTableName = `${req.params.classID}_${req.params.assignmentID}`;
    const studentArray = [];
    const marksArray = [];
    req.body.forEach((student) => {
      studentArray.push(student.student.id);
      marksArray.push(student.score);
    });
    await inputMarks(assignmentTableName, studentArray, marksArray);
    res.status(200).send("Marks successfully updated!");
  } catch (err) {
    res.status(500).send("There was an error updating the marks.");
  }
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
    res.status(500).send("There was an error.");
    console.log(err);
    next(err);
  }
};
