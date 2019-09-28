const BoardHandler = require("./boardHandler");
class BoardManager {
  static async createBoard(data) {
    try {
        const doc = await BoardHandler.createBoard(data);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getBoard(boardId) {
    try {
        const doc = await BoardHandler.getBoard(boardId);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllBoards() {
    try {
        const doc = await BoardHandler.getAllBoards();
        return doc;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateBoard(BoardId, data) {
    try {
        const doc = await BoardHandler.updateBoard(boardId, data);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
 
  static async deleteBoard(BoardId) {
    try {
        const doc = await BoardHandler.deleteBoard(boardId);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = BoardManager;
