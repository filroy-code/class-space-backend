var express = require("express");
var router = express.Router();
var classSpaceController = require("../controllers/classSpaceController");

/* GET home page. */
router.get("/", classSpaceController.welcome);

router.get("/:userID", classSpaceController.view_classes);

router.post("/:userID", classSpaceController.create_class);

router.get("/:userID/:classID", classSpaceController.get_class_info);

router.post(
  "/:userID/:classID",
  classSpaceController.add_student_or_assignment
);

module.exports = router;
