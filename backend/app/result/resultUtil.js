var request = require('request');
const ApplicationException = require("../../exceptions/ApplicationException");

const {
    ResultConstants,
    HTTPStatusCodeConstants,
    BoardConstants
} = require("../../constants");
  
const {
    ResultEnums
} = require("../../enums");


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

    static validateParametersToGetResultYears(secTitle, boardKey) {

        if(!validators.isValidStr(secTitle)) {

            throw new ApplicationException(ResultConstants.MESSAGES.INVALID_SECTION_TITLE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

        if(!validators.isValidStr(boardKey)) {

            throw new ApplicationException(ResultConstants.MESSAGES.INVALID_BOARD_KEY, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

    }

    static async validateResultId(resultId) {


        if(!validators.isValidId(resultId)) {

            throw new ApplicationException(ResultConstants.MESSAGES.INVALID_RESULT_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

    }

    static validateParametersToGetResult(sectionTitle, boardKey, year, examType) {

        if (!validators.isValidStr(sectionTitle)) {

            throw new ApplicationException(ResultConstants.MESSAGES.INVALID_SECTION, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

        if (!validators.isValidStr(boardKey)) {

            throw new ApplicationException(ResultConstants.MESSAGES.INVALID_BOARD, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

        if (!validators.isValidStr(year)) {

            throw new ApplicationException(ResultConstants.MESSAGES.INVALID_YEAR, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

        if (!validators.isValidStr(examType)) {

            throw new ApplicationException(ResultConstants.MESSAGES.INVALID_EXAM_TYPE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }
  

    }

    static validateRollNo(rollNo) {

        if (!validators.isValidStr(rollNo)) {

            throw new ApplicationException(ResultConstants.MESSAGES.INVALID_ROLL_NO, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

    }

    static async findResult(board, result, rollNo) {

        cLog.info(`findResult:: finding result of rollNo:: ${rollNo} from ${result.apiUrl}`);

        if(board === BoardConstants.BOARDS.BISE_LAHORE) {

            const rslt = await ResultUtil.findBiseLahoreResult(result, rollNo);

            return rslt;

        }

    }

    static async findBiseLahoreResult(result, rollNo) {

        cLog.info(`findBiseLahoreResult:: finding result of rollNo:: ${rollNo} from ${result.apiUrl}`);

        const degree = 'SSC';

        const rollNum = rollNo;

        const session = '1';

        const year = result.year;

        if(result.section.title === '9th') {

            degree = 'SSC';
            session = '1';

        } else if(result.section.title === '10th') {

            degree = 'SSC';
            session = '2';

        } else if(result.section.title === '11th') {

            degree = 'HSSC';
            session = '1';

        } else if(result.section.title === '12th') {

            degree = 'HSSC';
            session = '2';

        }

        if(result.examType === ResultEnums.EXAM_TYPES.SUPPLY) {

            session = '0';

        }

        const options = {
            method: "POST",
            url: "http://result.biselahore.com/Home/Result",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            form : {
                "degree": degree,
                "rollNum": rollNo,
                "session": session,
                "year": year
            }
        };
        
        request(options, function (err, res, body) {
            if(err) console.log(err);
            console.log(body);
        });

    }

}

module.exports = ResultUtil;