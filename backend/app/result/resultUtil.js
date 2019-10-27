const ApplicationException = require("../../exceptions/ApplicationException");
const {
    ResultConstants,
    HTTPStatusCodeConstants
} = require("../../constants");

const {
    cLog,
    validators
} = require("../../helpers");


class ResultUtil {

    static async validateParametersToCreateResult(data) {

        if(!data) {

            throw new ApplicationException(ResultConstants.MESSAGES.NO_DATA_FOUND_TO_ADD_RESULT, HTTPStatusCodeConstants.NOT_FOUND).toJson();
        
        }

        if(!validators.isValidId(data.sectionId)) {

            throw new ApplicationException(ResultConstants.MESSAGES.INVALID_SECTION_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

        if(!validators.isValidId(data.boardId)) {

            throw new ApplicationException(ResultConstants.MESSAGES.INVALID_BOARD_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

    }

    static async validateResultId(resultId) {


        if(!validators.isValidId(resultId)) {

            throw new ApplicationException(ResultConstants.MESSAGES.INVALID_RESULT_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

    }

}

module.exports = ResultUtil;