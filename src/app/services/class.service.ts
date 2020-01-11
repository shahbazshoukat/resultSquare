import {Class} from '../models/class.model';
import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
const BACKEND_URL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class ClassService {

  constructor (private http: HttpClient) {}

  addClass(title: string, type: string) {
    const classData: any = { title: title, type: type};
    return this.http.post<{success: boolean, message: string, data: any}>(BACKEND_URL + '/section', classData);
  }

  getAllClasses() {
    return this.http.get<{success: boolean, message: string, data: any}>(BACKEND_URL + '/sections');
  }

  getClassById(classId: string) {
    return this.http.get<{success: boolean, message: string, data: any}>(BACKEND_URL + '/section' + classId);
  }

  getClassByTitle(title: string) {
    return this.http.get<{success: boolean, message: string, data: any}>(BACKEND_URL + '/getSection' + title);
  }

  updateClass( classId: string, title: string, type: string ) {
    const update = { title: title, type: type };
    return this.http.put<{success: boolean, message: string, data: any}>(BACKEND_URL +  '/updateSection' + classId, update);
  }


  deleteClass(classId: string) {
    return this.http.delete<{success: boolean, message: string, data: any}>(BACKEND_URL + '/deleteSection' + classId);
  }

}


