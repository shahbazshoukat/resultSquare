const Result = require("./result");

class ResultHandler {
  static createResult(data) {
    const Result = new Result({
      status: data.stats,
      class: data.classId,
      Board: data.boardId,
      year:data.year,
      announceDate: data.announceDate,
      examType: data.examType,
      apiMode: data.apiMode,
      resultUrl:data.resultUrl,
      apiUrl: data.apiUrl,
      requestType: data.requestType,
      apiParams: data.apiParams,
      tags: data.tags
    });
    return Result.save();
  }

  static getResult(resultId) {
    const q = { _id: resultId };
    return Result.find(q)
      .lean()
      .exec();
  }

  static getAllResults() {
    return Result.find()
      .lean()
      .exec();
  }

  static updateResult(resultId, data) {
    const q = { _id: resultId };
    const update = {
      status: data.stats,
      class: data.classId,
      Board: data.boardId,
      year:data.year,
      announceDate: data.announceDate,
      examType: data.examType,
      apiMode: data.apiMode,
      resultUrl:data.resultUrl,
      apiUrl: data.apiUrl,
      requestType: data.requestType,
      apiParams: data.apiParams,
      tags: data.tags
    };
    return Result.updateOne(q, update);
  }


  static deleteResult(resultId) {
    const q = { _id: resultId};
    return Result.deleteOne(q);
  }
}

module.exports = ResultHandler;
