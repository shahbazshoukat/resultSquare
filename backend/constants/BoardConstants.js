const BoardConstants = Object.freeze({
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
       BOARD_ADDED_SUCCESSFULLY: 'Board added successfully',
       BOARD_FETCHED_SUCCESSFULLY: 'Board fetched successfully',
       BOARDS_FETCHED_SUCCESSFULLY: 'Boards fetched successfully',
       BOARD_UPDATED_SUCCESSFULLY: 'Board updated successfully',
       BOARD_DELETED_SUCCESSFULLY: 'Board deleted successfully',
       FAILED_TO_ADD_BOARD: 'Failed to add board',
       BOARD_FETCHING_FAILED: 'Board fetching failed',
       BOARDS_FETCHING_FAILED: 'Boards fetching failed',
       FAILED_TO_UPDATE_BOARD: 'Failed to update board',
       FAILED_TO_DELETE_BOARD: 'Failed to delete board'
   }
});

module.exports = BoardConstants;