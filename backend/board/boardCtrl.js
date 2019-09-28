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
      res.status(404).json({
        success: false,
        message: err
      });
    }
  }

  static async getBoard(req, res) {
    try {
      const doc = await BoardManager.getBoard(req.body.boardId);
      res.status(200).json({
        success: true,
        message: "Board fetched successfully!",
        data: doc
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err
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
        res.status(404).json({
            success: false,
            message: err
          });
    }
  }

  static async updateBoard(req, res) {
    try {
      const doc = await BoardManager.updateBoard(req.body.boardId, req.body.data);
      res.status(200).json({
        success: true,
        message: "Board updated successfully!",
        data: doc
      });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err
          });
    }
  }

  static async deleteBoard(req, res) {
    try {
      const doc = await BoardManager.deleteBoard(req.body.boardId);
      res.status(200).json({ 
        success: true,  
        message: "Board deleted Successfully!" 
    });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err
          });
    }
  }
}

module.exports = BoardController;
