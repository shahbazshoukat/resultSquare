import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@env/environment';
import { APIResponse } from '@app/models';

@Injectable({providedIn: 'root'})
export class ResultService {

  constructor (private http: HttpClient) {}

  getLatestResults() {

    return this.http.get<APIResponse>(ENV.apiUrl + '/api/results/latest');

  }

  getResultsByBoardKey(boardKey) {

    return this.http.get<APIResponse>(ENV.apiUrl + `/api/board-results/${boardKey}`);

  }

  getResultYears(selectedClassId, selectedBoardId) {

    return this.http.get<APIResponse>(ENV.apiUrl + `/api/result-year/${selectedClassId}/${selectedBoardId}`);

  }

  getExamTypes(selectedClassId, selectedBoardId, year) {

    return this.http.get<APIResponse>(ENV.apiUrl + `/api/exam-types/${selectedClassId}/${selectedBoardId}/${year}`);

  }

  getResult(section, board, year, exam) {

    return this.http.get<APIResponse>(ENV.apiUrl + `/api/result/${section}/${board}/${year}/${exam}`);

  }

  addComment(resultId, comment) {

    return this.http.post<APIResponse>(ENV.apiUrl + `/api/comment/${resultId}`, comment);

  }

}
