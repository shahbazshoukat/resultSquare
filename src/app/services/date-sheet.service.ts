import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@env/environment';
import { APIResponse } from '@app/models';
import * as Enums from '@app/app.enums';

@Injectable({providedIn: 'root'})
export class DateSheetService {

  constructor (private http: HttpClient) {}

  getLatestDateSheets() {

    return this.http.get<APIResponse>(ENV.apiUrl + '/api/date-sheets/latest');

  }

  getDateSheetsByBoardDomain(domain) {

    return this.http.get<APIResponse>(ENV.apiUrl + `/api/board-date-sheets/${domain}`);

  }

  getDateSheetYears(selectedClassId, selectedBoardId) {

    return this.http.get<APIResponse>(ENV.apiUrl + `/api/date-sheet-year/${selectedClassId}/${selectedBoardId}`);

  }

  getExamTypes(selectedClassId, selectedBoardId, year) {

    return this.http.get<APIResponse>(ENV.apiUrl + `/api/date-sheets/exam-types/${selectedClassId}/${selectedBoardId}/${year}`);

  }

  getDateSheet(params) {

    return this.http.get<APIResponse>(ENV.apiUrl + `/api/date-sheet/${params.board}/${params.section}/${params.examType}/${params.year}`);

  }

  getDateSheetByPageId(pageId) {

    return this.http.get<APIResponse>(ENV.apiUrl + `/api/date-sheets/${pageId}`);

  }

  addComment(resultId, comment) {

    return this.http.post<APIResponse>(ENV.apiUrl + `/api/comment/${resultId}`, comment);

  }

  getExamType(exam) {

    if (exam === Enums.EXAM_TYPE.ANNUAL) {

      return 'Annual';

    } else if (exam === Enums.EXAM_TYPE.SUPPLY) {

      return 'Supply';

    } else if (exam === Enums.EXAM_TYPE.TEST) {

      return 'Test';

    }

  }

}
