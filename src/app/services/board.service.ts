import {Board} from "../models/board.model";
import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
const BACKEND_URL = environment.apiURL;

@Injectable({providedIn:'root'})
export class BoardService{

  constructor (private http: HttpClient) {}

  addBoard(
    _id: null,
    key: string,
    title: string,
    province: string,
    city: string,
    examTypes: object[],
    sections: string[],
    apiMode: number, //0 = api, 1 = scrapping, 2 = url
    webUrl: string,
    resultUrl: string,
    apiUrl: string,
    requestType: number, //0 = GET, 1 = POST
    apiParams: string[],
    tags: string[]
  ): Observable<any>
  {
    const boardData: Board = {
      _id: _id,
      key: title.replace(/\s/g, "-"),
      title: title,
      province: province,
      city: city,
      examTypes: examTypes,
      sections: sections,
      apiMode: apiMode, //0 = api, 1 = scrapping, 2 = url
      webUrl: webUrl,
      resultUrl: resultUrl,
      apiUrl: apiUrl,
      requestType: requestType, //0 = GET, 1 = POST
      apiParams: apiParams,
      tags: tags
    };
    return this.http.post<{success: boolean, message: string, data: any}>(BACKEND_URL + '/board', boardData);
  }

  getAllBoardes(): Observable<any>{
    return this.http.get<{success: boolean, message: string, data: any}>(BACKEND_URL + '/boards');
  }

  getBoardById(boardId: string): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>(BACKEND_URL + '/board/' + boardId);
  }

  getBoardByKey(boardKey: string): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>(BACKEND_URL + '/getBoard/' + boardKey);
  }

  getBoardBySectionId(sectionId: string): Observable<any> {
    return this.http.get<{success: boolean, message: string, data: any}>(BACKEND_URL + '/getBoardBySection/' + sectionId);
  }

  updateBoard( 
    boardId: string,
    key: string,
    title: string,
    province: string,
    city: string,
    examTypes: object[],
    sections: string[],
    apiMode: number, //0 = api, 1 = scrapping, 2 = url
    webUrl: string,
    resultUrl: string,
    apiUrl: string,
    requestType: number, //0 = GET, 1 = POST
    apiParams: string[],
    tags: string[]
  ): Observable<any>
   {
    const update = { 
      key: title.replace(/\s/g, "-"),
      title: title,
      province: province,
      city: city,
      examTypes: examTypes,
      sections: sections,
      apiMode: apiMode, //0 = api, 1 = scrapping, 2 = url
      webUrl: webUrl,
      resultUrl: resultUrl,
      apiUrl: apiUrl,
      requestType: requestType, //0 = GET, 1 = POST
      apiParams: apiParams,
      tags: tags
     };
    
     return this.http.put<{success: boolean, message: string, data: any}>(BACKEND_URL +  "/updateBoard/" + boardId, update);
  }


  deleteBoard(boardId: string): Observable<any> {
    return this.http.delete<{success: boolean, message: string, data: any}>(BACKEND_URL + "/deleteBoard/" + boardId);
  }

}


