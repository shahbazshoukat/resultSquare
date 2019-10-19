const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const SectionController = require("../section/sectionCtrl");


router.post("/section", SectionController.createSection);

router.get("/sections",  SectionController.getAllSections);

router.get("/section:sectionId",  SectionController.getSection);

router.put("/updateSection:sectionId", SectionController.updateSection);

router.delete("/deleteSection:sectionId", SectionController.deleteSection);

module.exports = router;
