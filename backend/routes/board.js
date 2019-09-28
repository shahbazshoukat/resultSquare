const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const BoardController = require("../board/boardCtrl");


router.post("/board", checkAuth, BoardController.createBoard);

router.get("/boards", checkAuth, BoardController.getAllBoards);

router.get("/board:boardId", checkAuth, BoardController.getBoard);

router.put("/updateBoard:boardId", checkAuth, BoardController.updateBoard);

router.delete("/deleteBoard/:boardId", checkAuth, BoardController.deleteBoard);

module.exports = router;
