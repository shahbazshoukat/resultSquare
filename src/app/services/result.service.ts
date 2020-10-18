import { Result } from '@app/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ResultService {

  constructor (private http: HttpClient) {}

  getLatestResults() {
    return this.http.get<{success: boolean, message: string, data: any}>('/api/results/latest');
  }

  getResultById(resultId: string) {
    return this.http.get<{success: boolean, message: string, data: any}>('/api/result/' + resultId);
  }

  getResultYears(selectedClassId, selectedBoardId) {
    return this.http.get<{success: boolean, message: string, data: any}>(`/api/result-year/${selectedClassId}/${selectedBoardId}`);
  }

  getExamTypes(selectedClassId, selectedBoardId, year) {
    return this.http.get<{success: boolean, message: string, data: any}>(`/api/exam-types/${selectedClassId}/${selectedBoardId}/${year}`);
  }

  getResult(section, board, year, exam) {
    return this.http.get<{success: boolean, message: string, data: any}>(`/api/result/${section}/${board}/${year}/${exam}`);
  }

  getResultsByBoardKey(boardKey) {
    return this.http.get<{success: boolean, message: string, data: any}>(`/api/results/board/${boardKey}`);
  }

  addComment(resultId, comment) {

    return this.http.post<{success: boolean, message: string, data: any}>(`/api/comment/${resultId}`, comment);

  }

  removeComment(resultId, commentId) {

    return this.http.delete<{success: boolean, message: string, data: any}>(`/api/comment/${resultId}/${commentId}`);

  }

}
