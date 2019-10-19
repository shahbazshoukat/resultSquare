const Board = require("./board");

class BoardHandler {
  static createBoard(data) {
    const board = new Board({
      title: data.title,
      province: data.province,
      city: data.city,
      examTypes: data.examTypes,
      sections: data.classes,
      apiMode: data.apiMode,
      webUrl: data.webUrl,
      resultUrl: data.resultUrl,
      apiUrl: data.apiUrl,
      requestType: data.requestType,
      apiParams: data.apiParams,
      tags: data.tags
    });
    return board.save();
  }

  static getBoard(boardId) {
    const q = { _id: boardId };
    return Board.findOne(q).populate("sections")
      .lean()
      .exec();
  }

  static getAllBoards() {
    return Board.find().populate("sections")
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
      sections: data.classes,
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
