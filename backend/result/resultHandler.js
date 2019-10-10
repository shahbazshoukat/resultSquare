const Result = require("./result");

class ResultHandler {
  static createResult(data) {
    const result = new Result({
      status: data.status,
      section: data.sectionId,
      board: data.boardId,
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
    return result.save();
  }

  static getResult(resultId) {
    const q = { _id: resultId };
    return Result.findOne(q).populate("board").populate("section")
      .lean()
      .exec();
  }

  static getAllResults() {
    return Result.find().populate("board").populate("section")
      .lean()
      .exec();
  }

  static updateResult(resultId, data) {
    const q = { _id: resultId };
    const update = {
      status: data.status,
      section: data.sectionId,
      board: data.boardId,
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

  static updateResultStatus(resultId, data){
    const q = { _id: resultId };
    const update = {
      status: data.status
    };
    return Result.updateOne(q, update);
  }


  static deleteResult(resultId) {
    const q = { _id: resultId};
    return Result.deleteOne(q);
  }
}

module.exports = ResultHandler;
