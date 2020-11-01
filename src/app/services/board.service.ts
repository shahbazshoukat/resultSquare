import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class BoardService {

  constructor (private http: HttpClient) {}

  getAllBoards(): Observable<any> {

    return this.http.get<{success: boolean, message: string, data: any}>( '/api/boards');

  }

  getBoardsBySectionId(sectionId: string): Observable<any> {

    return this.http.get<{success: boolean, message: string, data: any}>('/api/boards/section/' + sectionId);

  }

}


