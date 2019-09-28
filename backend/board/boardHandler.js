const Board = require("./board");

class BoardHandler {
  static createBoard(data) {
    const Board = new Board({
      title: data.title,
      province: data.province,
      city: data.city,
      examTypes: data.examTypes,
      classes: data.classes,
      apiMode: data.apiMode,
      webUrl: data.webUrl,
      resultUrl: data.resultUrl,
      apiUrl: data.apiUrl,
      requestType: data.requestType,
      apiParams: data.apiParams,
      tags: data.tags
    });
    return Board.save();
  }

  static getBoard(boardId) {
    const q = { _id: boardId };
    return Board.find(q)
      .lean()
      .exec();
  }

  static getAllBoards() {
    return Board.find()
      .lean()
      .exec();
  }

  static updateBoard(boardId, data) {
    const q = { _id: boardId };
    const update = {
      title: data.title,
      province: data.province,
      city: data.city,
      examTypes: data.examTypes,
      classes: data.classes,
      apiMode: data.apiMode,
      webUrl: data.webUrl,
      resultUrl: data.resultUrl,
      apiUrl: data.apiUrl,
      requestType: data.requestType,
      apiParams: data.apiParams,
      tags: data.tags
    };
    return Board.updateOne(q, update);
  }


  static deleteBoard(boardId) {
    const q = { _id: boardId};
    return Board.deleteOne(q);
  }
}

module.exports = BoardHandler;
