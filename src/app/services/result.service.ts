import {Result} from "../models/result.model";
import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
const BACKEND_URL = environment.apiURL;

@Injectable({providedIn:'root'})
export class ResultService{

  constructor (private http: HttpClient) {}

  addResult(
    _id: string,
    status: boolean,
    section: string,
    board: string,
    year: string,
    announceDate: string,
    examType: number,
    apiMode: number, //0 = api, 1 = scrapping, 2 = url
    resultUrl: string,
    apiUrl: string,
    requestType: number, //0 = GET, 1 = POST
    apiParams: string[],
    tags: string[]
  ){
    const resultData: Result = {
      _id: _id,
      status: status,
      sectionId: section,
      boardId: board,
      year: year,
      announceDate: announceDate,
      examType: examType,
      apiMode: apiMode, //0 = api, 1 = scrapping, 2 = url
      resultUrl: resultUrl,
      apiUrl: apiUrl,
      requestType: requestType, //0 = GET, 1 = POST
      apiParams: apiParams,
      tags: tags
    };
    return this.http.post<{success: boolean, message: string, data: any}>(BACKEND_URL + '/result', resultData);
  }

  getAllResultes(){
    return this.http.get<{success: boolean, message: string, data: any}>(BACKEND_URL + '/results');
  }

  getResultById(resultId: string) {
    return this.http.get<{success: boolean, message: string, data: any}>(BACKEND_URL + '/result' + resultId);
  }

  updateResult( 
    resultId: string,
    status: boolean,
    section: string,
    boardId: string,
    year: string,
    announceDate: string,
    examType: number,
    apiMode: number, //0 = api, 1 = scrapping, 2 = url
    resultUrl: string,
    apiUrl: string,
    requestType: number, //0 = GET, 1 = POST
    apiParams: string[],
    tags: string[]
  ) {
    const update = { 
      status: status,
      sectionId: section,
      boardId: boardId,
      year: year,
      announceDate: announceDate,
      examType: examType,
      apiMode: apiMode, //0 = api, 1 = scrapping, 2 = url
      resultUrl: resultUrl,
      apiUrl: apiUrl,
      requestType: requestType, //0 = GET, 1 = POST
      apiParams: apiParams,
      tags: tags
     };
      return this.http.put<{success: boolean, message: string, data: any}>(BACKEND_URL +  "/updateResult" + resultId, update);
  }


  deleteResult(resultId: string) {
    return this.http.delete<{success: boolean, message: string, data: any}>(BACKEND_URL + "/deleteResult" + resultId);
  }

  changeResultStatus(resultId: string, value: boolean) {
    const update = {status: value};
    return this.http.put<{success: boolean, message: string, data: any}>(BACKEND_URL +  "/updateStatus" + resultId, update);
  }

}
