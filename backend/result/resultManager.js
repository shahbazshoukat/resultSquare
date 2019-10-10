const ResultHandler = require("./resultHandler");
class ResultManager {
  static async createResult(data) {
    try {
        const doc = await ResultHandler.createResult(data);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getResult(resultId) {
    try {
        const doc = await ResultHandler.getResult(resultId);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllResults() {
    try {
        const doc = await ResultHandler.getAllResults();
        return doc;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateResult(resultId, data) {
    try {
        const doc = await ResultHandler.updateResult(resultId, data);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateResultStatus(resultId, data) {
    try {
        const doc = await ResultHandler.updateResultStatus(resultId, data);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }  
 
  static async deleteResult(resultId) {
    try {
        const doc = await ResultHandler.deleteResult(resultId);
        if(!doc){
          return  { 
            success: false,
            message: "Failed to delete Result",  
            data: null 
          }
        }
        return { 
          success: true,  
          message: "Result deleted Successfully!" ,
          data: doc
        }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ResultManager;
