var express = require("express");
var router = express.Router();
var classSpaceController = require("../controllers/classSpaceController");

/* GET home page. */
router.get("/", classSpaceController.welcome);

router.get("/:userID", classSpaceController.view_classes);

router.post("/:userID", classSpaceController.create_class);

router.get(
  "/:userID/:classID/assignments",
  classSpaceController.get_class_assignment_info
);

router.get(
  "/:userID/:classID/students",
  classSpaceController.get_class_student_info
);

router.put(
  "/:userID/:classID/students/:studentID",
  classSpaceController.update_student_details
);

router.get(
  "/:userID/:classID/assignments/:assignmentID",
  classSpaceController.get_assignment_marks
);

router.post(
  "/:userID/:classID/assignments/:assignmentID",
  classSpaceController.input_assignment_marks
);

router.get(
  "/:userID/:classID/assignments/:assignmentID/distribution",
  classSpaceController.get_assignment_marks_distribution
);

router.get("/:userID/:classID/summary", classSpaceController.get_class_summary);

router.put("/:userID/:classID/summary", classSpaceController.adjust_weighting);

router.post(
  "/:userID/:classID",
  classSpaceController.add_student_or_assignment
);

router.delete("/:userID/:classID", classSpaceController.delete_class);

module.exports = router;
