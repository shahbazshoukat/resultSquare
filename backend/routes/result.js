const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const ResultController = require("../result/resultCtrl");


router.post("/result", checkAuth, ResultController.createResult);

router.get("/results", checkAuth, ResultController.getAllResults);

router.get("/result:resultId", checkAuth, ResultController.getResult);

router.put("/updateResult:resultId", checkAuth, ResultController.updateResult);

router.delete("/deleteResult/:resultId", checkAuth, ResultController.deleteResult);

module.exports = router;