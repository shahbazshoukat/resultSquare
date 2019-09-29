import {Class} from "../models/class.model";
import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
const BACKEND_URL = environment.apiURL;

@Injectable({providedIn:'root'})
export class ClassService{

  constructor (private http: HttpClient) {}

  addClass(title: string, type: string){
    const classData: any = { title: title, type: type};
    this.http.post<{data: any}>(BACKEND_URL + '/section', classData)
    .subscribe(responseData => {
      console.log(responseData);
    })
  }

  getAllClasses(){
    this.http.get<{data: any}>(BACKEND_URL + '/sections')
    .subscribe(classesData =>{
      return classesData;
    })
  }

  getClassById(classId: string) {
    this.http.get<{data: any}>(BACKEND_URL + '/section' + classId)
    .subscribe(classData =>{
      return classData;
    })
  }

  updateClass( classId: string, title: string, type: string ) {
    const update = { title: title, type: type };
    this.http
      .put(BACKEND_URL +  "/updateSection/" + classId, update)
      .subscribe(response => {
        console.log(response);
      });
  }


  deleteClass(classId: string) {
    return this.http
      .delete(BACKEND_URL + "/deleteSection/" + classId).subscribe(res => {
        console.log(res);
      });
  }

}


