const BoardManager = require("./boardManager");
const {
  BoardConstants,
  HTTPStatusCodeConstants
 } = require("../../constants");

class BoardController {
  static async createBoard(req, res) {
    try {
      const doc = await BoardManager.createBoard(req.body);
      res.status(HTTPStatusCodeConstants.CREATED).json({
        success: true,
        message: BoardConstants.MESSAGES.BOARD_ADDED_SUCCESSFULLY,
        data: doc._id
      });
    } catch (error) {
      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  static async getBoard(req, res) {
    try {
      const doc = await BoardManager.getBoard(req.params.boardId);
      res.status(HTTPStatusCodeConstants.OK).json({
        success: true,
        message: BoardConstants.MESSAGES.BOARD_FETCHED_SUCCESSFULLY,
        data: doc
      });
    } catch (error) {
      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  static async getAllBoards(req, res) {
    try {
      const doc = await BoardManager.getAllBoards();
      res.status(HTTPStatusCodeConstants.OK).json({
        success: true,
        message: BoardConstants.MESSAGES.BOARDS_FETCHED_SUCCESSFULLY,
        data: doc
      });
    } catch (error) {
      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  static async updateBoard(req, res) {
    try {
      const doc = await BoardManager.updateBoard(req.params.boardId, req.body);
      res.status(HTTPStatusCodeConstants.OK).json({
        success: true,
        message: BoardConstants.MESSAGES.BOARD_UPDATED_SUCCESSFULLY,
        data: doc
      });
    } catch (error) {
      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  static async deleteBoard(req, res) {
    try {
      const doc = await BoardManager.deleteBoard(req.params.boardId);
      res.status(HTTPStatusCodeConstants.OK).json({
        success: true,
        message: BoardConstants.MESSAGES.BOARD_DELETED_SUCCESSFULLY,
        data: doc
      });
    } catch (error) {
      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }
}

module.exports = BoardController;
