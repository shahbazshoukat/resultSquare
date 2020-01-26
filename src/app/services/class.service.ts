import {Class} from '../models/class.model';
import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ClassService {

  constructor (private http: HttpClient) {}

  addClass(title: string, type: string) {
    const classData: any = { title: title, type: type};
    return this.http.post<{success: boolean, message: string, data: any}>('/api/section', classData);
  }

  getAllClasses() {
    return this.http.get<{success: boolean, message: string, data: any}>('/api/sections');
  }

  getClassById(classId: string) {
    return this.http.get<{success: boolean, message: string, data: any}>('/api/section' + classId);
  }

  getClassByTitle(title: string) {
    return this.http.get<{success: boolean, message: string, data: any}>('/api/getSection' + title);
  }

  updateClass( classId: string, title: string, type: string ) {
    const update = { title: title, type: type };
    return this.http.put<{success: boolean, message: string, data: any}>('/api/updateSection' + classId, update);
  }


  deleteClass(classId: string) {
    return this.http.delete<{success: boolean, message: string, data: any}>('/api/deleteSection' + classId);
  }

}


