import { Board } from '@app/models';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@env/environment';

@Injectable({providedIn: 'root'})
export class BoardService {

  boards = new BehaviorSubject<any>([]);

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
    return this.http.post<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/board', boardData);
  }

  getAllBoardes(): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>( ENV.apiURL + '/api/boards');
  }

  getBoardById(boardId: string): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/board/' + boardId);
  }

  getBoardByKey(boardKey: string): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/board/key/' + boardKey);
  }

  getBoardsBySectionTitle(sectionTitle: string): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/board/section/' + sectionTitle);
  }

  getBoardsByProvince(province: string): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/boards/province/' + province);
  }

  getBoardsBySectionId(sectionId: string): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/boards/section/' + sectionId);
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

     return this.http.put<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/updateBoard/' + boardId, update);
  }


  deleteBoard(boardId: string): Observable<any> {
    return this.http.delete<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/deleteBoard/' + boardId);
  }

  addComment(boardId, comment) {

    return this.http.post<{success: boolean, message: string, data: any}>(ENV.apiURL + `/api/board/comment/${boardId}`, comment);

  }

  removeComment(boardId, commentId) {

    return this.http.delete<{success: boolean, message: string, data: any}>(ENV.apiURL + `/api/board/comment/${boardId}/${commentId}`);

  }

  setBoardsUpdateListener(boards) {

    this.boards.next(boards);

  }

  getBoardsUpdateListener(): Observable<any> {

    return this.boards.asObservable();

  }
}


