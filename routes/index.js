var express = require("express");
var router = express.Router();
var classSpaceController = require("../controllers/classSpaceController");

/* GET home page. */
router.get("/", classSpaceController.view_classes);

router.post("/", classSpaceController.create_class);

router.get("/:class_id", classSpaceController.class_info);

module.exports = router;
