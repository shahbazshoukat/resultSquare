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
       FAILED_TO_DELETE_RESULT: 'Failed to delete Result'
   }
});

module.exports = ResultConstants;