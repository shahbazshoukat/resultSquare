const ResultHandler = require("./resultHandler");
const ResultUtil = require("./resultUtil");
const ApplicationException = require("../../exceptions/ApplicationException");
const {
  ResultConstants,
  HTTPStatusCodeConstants
} = require("../../constants");

const {
  cLog,
  validators
} = require("../../helpers");


class ResultManager {

  static async createResult(data) {

    try {

      await ResultUtil.validateParametersToCreateResult(data);

      const doc = await ResultHandler.createResult(data);

      return doc;

    } catch (error) {

      cLog.error(`createResult:: Failed to create Result data:: `, data, error);

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.FAILED_TO_ADD_RESULT, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();
    
    }

  }

  static async getResult(resultId) {

    try {

        await ResultUtil.validateResultId(resultId);

        const doc = await ResultHandler.getResult(resultId);

        return doc;

    } catch (error) {

      cLog.error(`getResult:: Failed to fetch Result ResultId:: ${resultId}`, error);

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.RESULT_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getAllResults() {

    try {

        const doc = await ResultHandler.getAllResults();

        return doc;

    } catch (error) {

      cLog.error(`getAllResults:: Failed to fetch Results`, error);

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.RESULTS_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async updateResult(resultId, data) {

    try {

        await ResultUtil.validateResultId(resultId);

        await ResultUtil.validateParametersToCreateResult(data);

        const doc = await ResultHandler.updateResult(resultId, data);

        return doc;

    } catch (error) {

      cLog.error(`updateResult:: Failed to update Result ResultId:: ${resultId} update:: `, data, error);

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.FAILED_TO_UPDATE_RESULT, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }
 
  static async deleteResult(resultId) {

    try {

        await ResultUtil.validateResultId(resultId);

        const doc = await ResultHandler.deleteResult(resultId);
        
        return doc;

    } catch (err) {

      cLog.error(`deleteResult:: Failed to delete Result ResultId:: ${resultId}`, error);

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.FAILED_TO_DELETE_RESULT, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async updateResultStatus(resultId, status) {

    try {

        cLog.info(`updateResultStatus:: updating result status resultId:: ${resultId} status:: ${status}`);

        await ResultUtil.validateResultId(resultId);

        const doc = await ResultHandler.updateResultStatus(resultId, status);

        cLog.success(`updateResultStatus:: result status updated successfully resultId:: ${resultId} status:: ${status}`);
        
        return doc;

    } catch (err) {

      cLog.error(`deleteResult:: Failed to update Result status ResultId:: ${resultId} status:: ${status}`, error);

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.FAILED_TO_UPDATE_RESULT_STATUS, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

}

module.exports = ResultManager;