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
const { updateStudentDetails } = require("../database/updateStudentDetails");
const { getClassSummary } = require("../database/getClassSummary");
const { deleteClass } = require("../database/deleteClass");

exports.welcome = function (req, res, next) {
  res.json({ message: "Hello and welcome to the backend server." });
};

exports.view_classes = async function (req, res, next) {
  try {
    const classList = await getListOfClasses(req.params.userID);
    res.status(200).json({ classList });
  } catch (err) {
    res.status(500).send("There was an error");
    console.log(err);
  }
};

exports.get_class_assignment_info = async function (req, res, next) {
  try {
    const classInfo = await getClassAssignmentInfo(req.params.classID);
    res.status(200).json({ classInfo });
  } catch (err) {
    res.status(500).send("There was an error.");
    console.log(err);
  }
};

exports.get_class_student_info = async function (req, res, next) {
  try {
    const classInfo = await getClassStudentInfo(req.params.classID);
    res.status(200).json({ classInfo });
  } catch (err) {
    res.status(500).send("There was an error");
    console.log(err);
  }
};

exports.update_student_details = async function (req, res, next) {
  try {
    const updateInfo = await updateStudentDetails(
      req.params.studentID,
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.id
    );
    res.status(200).json(updateInfo);
  } catch (err) {
    res.status(500).send("There was an error.");
    console.log(err);
  }
};

exports.get_assignment_marks = async function (req, res, next) {
  try {
    const assignmentInfo = await getAssignmentMarks(
      req.params.classID,
      req.params.assignmentID
    );
    res.status(200).json({ assignmentInfo });
  } catch (err) {
    res.status(500).send("There was an error.");
    console.log(err);
  }
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
    res.status(500).send("There was an error.");
    console.log(err);
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
    res.status(500).send("There was an error.");
    console.log(err);
  }
};

exports.delete_class = async function (req, res, next) {
  try {
    let deletion = await deleteClass(req.body.classID);
    if (deletion) {
      res.status(200).send(deletion);
    } else {
      res.status(500).send("There was an error deleting the class.");
    }
  } catch (err) {
    res.status(500).send("There was an error");
    console.log(err);
  }
};

exports.get_class_summary = async function (req, res, next) {
  try {
    res.status(200).json(await getClassSummary(req.params.classID));
  } catch (err) {
    res.status(500).send("There was an error");
    console.log(err);
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
  }
};
