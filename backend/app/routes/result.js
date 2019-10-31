const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const ResultController = require("../result/resultCtrl");


router.post("/result", ResultController.createResult);

router.get("/results", ResultController.getAllResults);

router.get("/result/:resultId", ResultController.getResultById);

router.put("/updateResult/:resultId", ResultController.updateResult);

router.delete("/deleteResult/:resultId", ResultController.deleteResult);

router.put("/updateStatus/:resultId", ResultController.updateResultStatus);

router.get("/result-year/:sectionTitle/:boardKey", ResultController.getResultYears);

router.get("/result/:section/:board/:year/:exam", ResultController.getResult);

module.exports = router;
