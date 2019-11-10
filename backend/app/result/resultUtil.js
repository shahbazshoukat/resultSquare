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
    validators,
    restClient
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

       try {

            cLog.info(`findResult:: finding result of rollNo:: ${rollNo} from ${result.apiUrl}`);

            if(board === BoardConstants.BOARDS.BISE_LAHORE) {

                const rslt = await ResultUtil.findBiseLahoreResult(result, rollNo);

                return rslt;

            } else if(board === BoardConstants.BOARDS.BISE_GUJRANWALA) {

                const rslt = await ResultUtil.findBiseGujranwalaResult(result, rollNo);

                return rslt;

            } else if(board === BoardConstants.BOARDS.BISE_SAHIWAL) {

                const rslt = await ResultUtil.findBiseSahiwalResult(result, rollNo);

                return rslt;

            }


        } catch (error) {

            cLog.error(`findResult:: Failed to find result, board:: ${board} rollNo:: ${rollNo} resultApi:: ${result.apiUrl}`, error);

            throw new ApplicationException(ResultConstants.MESSAGES.SOMETHING_WENT_WRONG, HTTPStatusCodeConstants.NOT_FOUND).toJson();

        }


    }

    static async findBiseLahoreResult(result, rollNo) {

        try {

            cLog.info(`findBiseLahoreResult:: finding result of rollNo:: ${rollNo} from ${result.apiUrl}`);

            let degree;

            let session;

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

                url: result.apiUrl,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                form: {
                    "degree": degree,
                    "rollNum": rollNo,
                    "session": session,
                    "year": year,
                    "student_rno": rollNo,
                    "submit": "Get Result"
                }

            };

            
            
            cLog.info(`findBiseLahoreResult:: calling api to get result url:: ${result.apiUrl} header:: `, options.headers, `formData:: `, options.form);

            const apiResponse = await restClient.postWithHeaders(options);

            cLog.success(`findBiseLahoreResult:: Response from API`, apiResponse);

            return apiResponse;

        } catch (error) {

            cLog.error(`findBiseLahoreResult:: Failed to find result, result url:: ${result.apiUrl} header:: `, options.headers, `formData:: `, options.form, error);

            throw error;

        }

    }

    static async findBiseGujranwalaResult(result, rollNo) {

        try {

            cLog.info(`findBiseGujranwalaResult:: finding result of rollNo:: ${rollNo} from ${result.apiUrl}`);

            if (result.apiMode === ResultEnums.API_MODE.URL) {

                return result.resultUrl;

            }

            let clas;
            
            if (result.section.title === '9th') {

                clas = '9';

            } else if (result.section.title === '10th') {

                clas = '10';

            } else if (result.section.title === '11th') {

                clas = '11';

            } else if (result.section.title === '12th') {

                clas = '12';

            }

            if (result.examType === ResultEnums.EXAM_TYPES.SUPPLY && (result.section.title === '9th' || result.section.title === '10th')) {

                clas = 'ms';

            } else if (result.examType === ResultEnums.EXAM_TYPES.SUPPLY && (result.section.title === '11th' || result.section.title === '12th')) {

                clas = 'is';

            }

            const options = {

                url: result.apiUrl,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                form: {
                    "year": result.year,
                    "class": clas,
                    "rno": rollNo
                }
    
            };
    
            
            
            cLog.info(`findBiseGujranwalaResult:: calling api to get result url:: ${result.apiUrl} header:: `, options.headers, `formData:: `, options.form);
    
            const apiResponse = await restClient.postWithHeaders(options);
    
            cLog.success(`findBiseGujranwalaResult:: Response from API`, apiResponse);
    
            return apiResponse;


        } catch (error) {



        }
    }

    static async findBiseSahiwalResult(result, rollNo) {

        try {

            cLog.info(`findBiseSahiwalResult:: finding result of rollNo:: ${rollNo} from ${result.apiUrl}`);

            let section;

            let session;

            const year = result.year;

            if(result.section.title === '9th') {

                section = '1';

            } else if(result.section.title === '10th') {

                section = '2';

            } else if(result.section.title === '11th') {

                section = '3';

            } else if(result.section.title === '12th') {

                section = '4';

            }

            if(result.examType === ResultEnums.EXAM_TYPES.ANNUAL) {

                session = '1';

            } else {

                session = '2';

            }


            const options = {

                url: result.apiUrl,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                form: {
                    "class": section,
                    "year": year,
                    "sess": session,
                    "rno": rollNo,
                    "commit": "Get Result"
                }

            };

            
            
            cLog.info(`findBiseSahiwalResult:: calling api to get result url:: ${result.apiUrl} header:: `, options.headers, `formData:: `, options.form);

            const apiResponse = await restClient.postWithHeaders(options);

            cLog.success(`findBiseSahiwalResult:: Response from API`, apiResponse);

            return apiResponse;

        } catch (error) {

            cLog.error(`findBiseSahiwalResult:: Failed to find result, result url:: ${result.apiUrl} header:: `, options.headers, `formData:: `, options.form, error);

            throw error;

        }

    }

}

module.exports = ResultUtil;