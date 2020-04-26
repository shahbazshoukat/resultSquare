import { Result } from '@app/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@env/environment';

@Injectable({providedIn: 'root'})
export class ResultService {

  constructor (private http: HttpClient) {}

  addResult(
    _id: string,
    status: boolean,
    section: string,
    board: string,
    year: string,
    announceDate: any,
    examType: number,
    resultUrl: string,
    tags: string[]
  ) {
    const resultData: Result = {
      _id: _id,
      status: status,
      sectionId: section,
      boardId: board,
      year: year,
      announceDate: announceDate,
      examType: examType,
      resultUrl: resultUrl,
      tags: tags
    };
    return this.http.post<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/result', resultData);
  }

  getLatestResults() {
    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/results/latest');
  }

  getResultById(resultId: string) {
    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/result/' + resultId);
  }

  getResultYears(selectedClassId, selectedBoardId) {
    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiURL + `/api/result-year/${selectedClassId}/${selectedBoardId}`);
  }

  getExamTypes(selectedClassId, selectedBoardId, year) {
    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiURL + `/api/exam-types/${selectedClassId}/${selectedBoardId}/${year}`);
  }

  getResult(section, board, year, exam) {
    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiURL + `/api/result/${section}/${board}/${year}/${exam}`);
  }

  getResultsByBoardKey(boardKey) {
    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiURL + `/api/results/board/${boardKey}`);
  }

  getResultsBySectionAndBoard(sectionTitle, boardKey) {
    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiURL + `/api/results/${sectionTitle}/${boardKey}`);
  }

  updateResult(
    resultId: string,
    status: boolean,
    section: string,
    boardId: string,
    year: string,
    announceDate: any,
    examType: number,
    resultUrl: string,
    tags: string[]
  ) {
    const update = {
      status: status,
      sectionId: section,
      boardId: boardId,
      year: year,
      announceDate: announceDate,
      examType: examType,
      resultUrl: resultUrl,
      tags: tags
     };
      return this.http.put<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/updateResult/' + resultId, update);
  }


  deleteResult(resultId: string) {
    return this.http.delete<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/deleteResult/' + resultId);
  }

  changeResultStatus(resultId: string, value: boolean) {

    const update = {status: value};
    return this.http.put<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/updateStatus/' + resultId, update);

  }

  addComment(resultId, comment) {

    return this.http.post<{success: boolean, message: string, data: any}>(ENV.apiURL + `/api/comment/${resultId}`, comment);

  }

  removeComment(resultId, commentId) {

    return this.http.delete<{success: boolean, message: string, data: any}>(ENV.apiURL + `/api/comment/${resultId}/${commentId}`);

  }

}
