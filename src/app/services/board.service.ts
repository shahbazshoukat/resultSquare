import { Board } from '@app/models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class BoardService {

  constructor (private http: HttpClient) {}

  getAllBoardes(): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>( '/api/boards');
  }

  getBoardById(boardId: string): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>('/api/board/' + boardId);
  }

  getBoardByKey(boardKey: string): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>('/api/board/key/' + boardKey);
  }

  getBoardBySectionTitle(sectionTitle: string): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>('/api/boards/section/' + sectionTitle);
  }

  getBoardsBySectionId(sectionId: string): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>('/api/boards/section/' + sectionId);
  }

  addComment(boardId, comment) {

    return this.http.post<{success: boolean, message: string, data: any}>(`/api/board/comment/${boardId}`, comment);

  }

  removeComment(boardId, commentId) {

    return this.http.delete<{success: boolean, message: string, data: any}>(`/api/board/comment/${boardId}/${commentId}`);

  }

}


