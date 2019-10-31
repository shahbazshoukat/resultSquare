const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const BoardController = require("../board/boardCtrl");


router.post("/board", BoardController.createBoard);

router.get("/boards", BoardController.getAllBoards);

router.get("/board/:boardId", BoardController.getBoard);

router.put("/updateBoard/:boardId", BoardController.updateBoard);

router.delete("/deleteBoard/:boardId", BoardController.deleteBoard);

router.get("/getBoard/:boardKey", BoardController.getBoardByKey);

router.get("/getBoardBySection/:sectionId", BoardController.getBoardsBySectionId);

module.exports = router;
