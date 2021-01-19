import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@env/environment';

@Injectable({providedIn: 'root'})
export class ResultService {

  constructor (private http: HttpClient) {}

  getLatestResults() {

    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiUrl + '/api/results/latest');

  }

  getResultYears(selectedClassId, selectedBoardId) {

    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiUrl + `/api/result-year/${selectedClassId}/${selectedBoardId}`);

  }

  getExamTypes(selectedClassId, selectedBoardId, year) {

    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiUrl + `/api/exam-types/${selectedClassId}/${selectedBoardId}/${year}`);

  }

  getResult(section, board, year, exam) {

    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiUrl + `/api/result/${section}/${board}/${year}/${exam}`);

  }

  addComment(resultId, comment) {

    return this.http.post<{success: boolean, message: string, data: any}>(ENV.apiUrl + `/api/comment/${resultId}`, comment);

  }

}
