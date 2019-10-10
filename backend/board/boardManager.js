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

  static async updateBoard(boardId, data) {
    try {
        const doc = await BoardHandler.updateBoard(boardId, data);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
 
  static async deleteBoard(boardId) {
    try {
        const doc = await BoardHandler.deleteBoard(boardId);
        if(!doc){
          return { 
            success: false,  
            message: "Board deletion failed!",
            data: null 
          };
        }
        return { 
          success: true,  
          message: "Board deleted Successfully!",
          data: doc 
        };
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = BoardManager;
