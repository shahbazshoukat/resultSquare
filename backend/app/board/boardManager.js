const BoardHandler = require("./boardHandler");
const BoardUtil = require("./boardUtil");
const ApplicationException = require("../../exceptions/ApplicationException");
const {
  BoardConstants,
  HTTPStatusCodeConstants
} = require("../../constants");

const {
  cLog,
  validators
} = require("../../helpers");


class BoardManager {

  static async createBoard(data) {

    try {

      await BoardUtil.validateParametersToCreateBoard(data);

      const doc = await BoardHandler.createBoard(data);

      return doc;

    } catch (error) {

      cLog.error(`createBoard:: Failed to create Board data:: `, data, error);

      throw new ApplicationException(error.message || BoardConstants.MESSAGES.FAILED_TO_ADD_BOARD, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();
    
    }

  }

  static async getBoard(boardId) {

    try {

        await BoardUtil.validateBoardId(boardId);

        const doc = await BoardHandler.getBoard(boardId);

        return doc;

    } catch (error) {

      cLog.error(`getBoard:: Failed to fetch Board boardId:: ${boardId}`, error);

      throw new ApplicationException(error.message || BoardConstants.MESSAGES.BOARD_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getAllBoards() {

    try {

        const doc = await BoardHandler.getAllBoards();

        return doc;

    } catch (error) {

      cLog.error(`getAllBoards:: Failed to fetch Boards`, error);

      throw new ApplicationException(error.message || BoardConstants.MESSAGES.BOARDS_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async updateBoard(boardId, data) {

    try {

        await BoardUtil.validateBoardId(boardId);

        await BoardUtil.validateParametersToCreateBoard(data);

        const doc = await BoardHandler.updateBoard(boardId, data);

        return doc;

    } catch (error) {

      cLog.error(`updateBoard:: Failed to update Board boardId:: ${boardId} update:: `, data, error);

      throw new ApplicationException(error.message || BoardConstants.MESSAGES.FAILED_TO_UPDATE_BOARD, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }
 
  static async deleteBoard(boardId) {

    try {

        await BoardUtil.validateBoardId(boardId);

        const doc = await BoardHandler.deleteBoard(boardId);
        
        return doc;

    } catch (err) {

      cLog.error(`deleteBoard:: Failed to delete Board boardId:: ${boardId}`, error);

      throw new ApplicationException(error.message || BoardConstants.MESSAGES.FAILED_TO_DELETE_BOARD, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

}

module.exports = BoardManager;
