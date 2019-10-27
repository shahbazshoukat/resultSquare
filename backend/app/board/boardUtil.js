const ApplicationException = require("../../exceptions/ApplicationException");
const {
    BoardConstants,
    HTTPStatusCodeConstants
} = require("../../constants");

const {
    cLog,
    validators
} = require("../../helpers");


class BoardUtil {

    static async validateParametersToCreateBoard(data) {

        if(!data) {

            throw new ApplicationException(BoardConstants.MESSAGES.NO_DATA_FOUND_TO_ADD_BOARD, HTTPStatusCodeConstants.NOT_FOUND).toJson();
        
        }

        if(!validators.isValidStr(data.title)) {

            throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_TITLE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

        if(!validators.isValidStr(data.province)) {

            throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_PROVINCE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

        if(!validators.isValidStr(data.city)) {

            throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_CITY, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

        if(!data.examTypes) {

            throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_EXAMTYPE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

        if(!data.apiMode) {

            throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_API_MODE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

        if(!validators.isValidStr(data.webUrl)) {

            throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_WEB_URL, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

        if(!validators.isValidStr(data.resultUrl)) {

            throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_RESULT_URL, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

        if(!validators.isValidStr(data.apiUrl)) {

            throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_API_URL, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

        if(!data.requestType) {

            throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_REQUEST_TYPE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

    }

    static async validateBoardId(boardId) {


        if(!validators.isValidId(boardId)) {

            throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

    }

}

module.exports = BoardUtil;