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
    title: string,
    province: string,
    city: string,
    examTypes: object[],
    classes: string[],
    apiMode: number, //0 = api, 1 = scrapping, 2 = url
    webUrl: string,
    resultUrl: string,
    apiUrl: string,
    requestType: number, //0 = GET, 1 = POST
    apiParams: string[],
    tags: string[]
  ){
    const boardData: Board = {
      _id: _id,
      title: title,
      province: province,
      city: city,
      examTypes: examTypes,
      classes: classes,
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

  getAllBoardes(){
    return this.http.get<{success: boolean, message: string, data: any}>(BACKEND_URL + '/boards');
  }

  getBoardById(boardId: string) {
    return this.http.get<{success: boolean, message: string, data: any}>(BACKEND_URL + '/board' + boardId);
  }

  updateBoard( 
    boardId: string,
    title: string,
    province: string,
    city: string,
    examTypes: object[],
    classes: string[],
    apiMode: number, //0 = api, 1 = scrapping, 2 = url
    webUrl: string,
    resultUrl: string,
    apiUrl: string,
    requestType: number, //0 = GET, 1 = POST
    apiParams: string[],
    tags: string[]
  ) {
    const update = { 
      title: title,
      province: province,
      city: city,
      examTypes: examTypes,
      classes: classes,
      apiMode: apiMode, //0 = api, 1 = scrapping, 2 = url
      webUrl: webUrl,
      resultUrl: resultUrl,
      apiUrl: apiUrl,
      requestType: requestType, //0 = GET, 1 = POST
      apiParams: apiParams,
      tags: tags
     };
    
     return this.http.put<{success: boolean, message: string, data: any}>(BACKEND_URL +  "/updateBoard" + boardId, update);
  }


  deleteBoard(boardId: string) {
    return this.http.delete<{success: boolean, message: string, data: any}>(BACKEND_URL + "/deleteBoard" + boardId);
  }

}


