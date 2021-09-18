import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@env/environment';
import { APIResponse } from '@app/models';

@Injectable({providedIn: 'root'})
export class BoardService {

  constructor (private http: HttpClient) {}

  getAllBoards(): Observable<any> {

    return this.http.get<APIResponse>(ENV.apiUrl + '/api/boards');

  }

  getBoardsBySectionId(sectionId: string): Observable<any> {

    return this.http.get<APIResponse>(ENV.apiUrl + '/api/boards/section/' + sectionId);

  }

}
