import {Board} from '../models/board.model';
import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class BoardService {

  constructor (private http: HttpClient) {}

  addBoard(
    _id: null,
    key: string,
    title: string,
    province: string,
    city: string,
    examTypes: object[],
    sections: string[],
    type: string,
    webUrl: string,
    resultUrl: string,
    tags: string[]
  ): Observable<any> {
    const boardData: Board = {
      _id: _id,
      key: title.replace(/\s/g, '-'),
      title: title,
      province: province,
      city: city,
      examTypes: examTypes,
      sections: sections,
      type: type,
      webUrl: webUrl,
      resultUrl: resultUrl,
      tags: tags
    };
    return this.http.post<{success: boolean, message: string, data: any}>('/api/board', boardData);
  }

  getAllBoardes(): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>( '/api/boards');
  }

  getBoardById(boardId: string): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>('/api/board/' + boardId);
  }

  getBoardByKey(boardKey: string): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>('/api/getBoard/' + boardKey);
  }

  getBoardBySectionTitle(sectionTitle: string): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>('/api/getBoardBySectionTitle/' + sectionTitle);
  }

  updateBoard(
    boardId: string,
    key: string,
    title: string,
    province: string,
    city: string,
    examTypes: object[],
    sections: string[],
    type: string,
    webUrl: string,
    resultUrl: string,
    tags: string[]
  ): Observable<any> {
    const update = {
      key: title.replace(/\s/g, '-'),
      title: title,
      province: province,
      city: city,
      examTypes: examTypes,
      sections: sections,
      type: type,
      webUrl: webUrl,
      resultUrl: resultUrl,
      tags: tags
     };

     return this.http.put<{success: boolean, message: string, data: any}>('/api/updateBoard/' + boardId, update);
  }


  deleteBoard(boardId: string): Observable<any> {
    return this.http.delete<{success: boolean, message: string, data: any}>('/api/deleteBoard/' + boardId);
  }

}


