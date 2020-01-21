import {Result} from '../models/result.model';
import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ResultService {

  constructor (private http: HttpClient) {}

  addResult(
    _id: string,
    status: boolean,
    section: string,
    board: string,
    year: string,
    announceDate: string,
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
    return this.http.post<{success: boolean, message: string, data: any}>('/api/result', resultData);
  }

  getAllResultes() {
    return this.http.get<{success: boolean, message: string, data: any}>('/api/results');
  }

  getResultById(resultId: string) {
    return this.http.get<{success: boolean, message: string, data: any}>('/api/result/' + resultId);
  }

  getResultYears(selectedClass, selectedBoardKey) {
    return this.http.get<{success: boolean, message: string, data: any}>(`/api/result-year/${selectedClass}/${selectedBoardKey}`);
  }

  getResult(section, board, year, exam) {
    return this.http.get<{success: boolean, message: string, data: any}>(`/api/result/${section}/${board}/${year}/${exam}`);
  }

  getResultsByBoardKey(boardKey) {
    return this.http.get<{success: boolean, message: string, data: any}>(`/api/results/board/${boardKey}`);
  }

  updateResult(
    resultId: string,
    status: boolean,
    section: string,
    boardId: string,
    year: string,
    announceDate: string,
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
      return this.http.put<{success: boolean, message: string, data: any}>('/api/updateResult/' + resultId, update);
  }


  deleteResult(resultId: string) {
    return this.http.delete<{success: boolean, message: string, data: any}>('/api/deleteResult/' + resultId);
  }

  changeResultStatus(resultId: string, value: boolean) {
    const update = {status: value};
    return this.http.put<{success: boolean, message: string, data: any}>('/api/updateStatus/' + resultId, update);
  }

}
