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
    status: string,
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
      board: board,
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
    console.log(resultData);
    this.http.post<{data: any}>(BACKEND_URL + '/result', resultData)
    .subscribe(responseData => {
      console.log(responseData);
    })
  }

  getAllResultes(){
    this.http.get<{data: any}>(BACKEND_URL + '/results')
    .subscribe(resultsData =>{
      return resultsData;
    })
  }

  getResultById(resultId: string) {
    this.http.get<{data: any}>(BACKEND_URL + '/result' + resultId)
    .subscribe(resultData =>{
      return resultData;
    })
  }

  updateResult( 
    resultId: string,
    status: string,
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
  ) {
    const update = { 
      status: status,
      sectionId: section,
      board: board,
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
    this.http
      .put(BACKEND_URL +  "/updateResult/" + resultId, update)
      .subscribe(response => {
        console.log(response);
      });
  }


  deleteResult(resultId: string) {
    return this.http
      .delete(BACKEND_URL + "/deleteResult/" + resultId).subscribe(res => {
        console.log(res);
      });
  }

}


