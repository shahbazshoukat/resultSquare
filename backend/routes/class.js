const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const ClassController = require("../class/classCtrl");


router.post("/class", checkAuth, ClassController.createClass);

router.get("/classes", checkAuth, ClassController.getAllClasses);

router.get("/class:classId", checkAuth, ClassController.getClass);

router.put("/updateClass:classId", checkAuth, ClassController.updateClass);

router.delete("/deleteClass/:classId", checkAuth, ClassController.deleteClass);

module.exports = router;
