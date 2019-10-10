const BoardManager = require("./boardManager");

class BoardController {
  static async createBoard(req, res) {
    try {
      const doc = await BoardManager.createBoard(req.body);
      res.status(201).json({
        success: true,
        message: "Board Added successfully",
        data: doc._id
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err,
        data: null
      });
    }
  }

  static async getBoard(req, res) {
    try {
      const doc = await BoardManager.getBoard(req.params.boardId);
      res.status(200).json({
        success: true,
        message: "Board fetched successfully!",
        data: doc
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err,
        data: null
      });
    }
  }

  static async getAllBoards(req, res) {
    try {
      const doc = await BoardManager.getAllBoards();
      res.status(200).json({
        success: true,
        message: "Boards fetched successfully!",
        data: doc
      });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err,
            data: null
          });
    }
  }

  static async updateBoard(req, res) {
    try {
      const doc = await BoardManager.updateBoard(req.params.boardId, req.body);
      res.status(200).json({
        success: true,
        message: "Board updated successfully!",
        data: doc
      });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err,
            data: null
          });
    }
  }

  static async deleteBoard(req, res) {
    try {
      const doc = await BoardManager.deleteBoard(req.params.boardId);
      res.status(200).json(doc);
    } catch (err) {
        console.log(err);
    }
  }
}

module.exports = BoardController;
