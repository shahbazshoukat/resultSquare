const ResultConstants = Object.freeze({
    STATUS: {
        ANNOUNCED: true,
        NOT_ANNOUNCED: false
    },
    EXAM_TYPES: {
        ANNUAL: 'annual',
        SUPPLY: 'supply',
        TEST: 'test',
        RETOTAL: 'retotal'
    },
   API_MODE: {
       API: 'api',
       SCRAPING: 'scraping',
       URL: 'url'
   },
   REQUEST_TYPE: {
       POST: 'post',
       GET: 'get'
   },
   MESSAGES: {
       RESULT_ADDED_SUCCESSFULLY: 'Result added successfully',
       RESULT_FETCHED_SUCCESSFULLY: 'Result fetched successfully',
       RESULTS_FETCHED_SUCCESSFULLY: 'Results fetched successfully',
       RESULT_UPDATED_SUCCESSFULLY: 'Result updated successfully',
       RESULT_DELETED_SUCCESSFULLY: 'Result deleted successfully',
       FAILED_TO_ADD_RESULT: 'Failed to add Result',
       RESULT_FETCHING_FAILED: 'Result fetching failed',
       RESULTS_FETCHING_FAILED: 'Results fetching failed',
       FAILED_TO_UPDATE_RESULT: 'Failed to update Result',
       FAILED_TO_DELETE_RESULT: 'Failed to delete Result',
       RESULT_STATUS_UPDATED_SUCCESSFULLY: 'Result status updated successfully',
       FAILED_TO_UPDATE_RESULT_STATUS: 'Failed to update result status',
       NO_DATA_FOUND_TO_ADD_RESULT: 'No data found to add result',
       INVALID_SECTION_ID: 'Invalid section id',
       INVALID_BOARD_ID: 'Invalid board id',
       INVALID_RESULT_ID: 'Invalid result id'
   }
});

module.exports = ResultConstants;