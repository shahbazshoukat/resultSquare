import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@env/environment';

@Injectable({providedIn: 'root'})
export class ClassService {

  constructor (private http: HttpClient) {}

  addClass(title: string, type: string) {
    const classData: any = { title: title, type: type};
    return this.http.post<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/section', classData);
  }

  getAllClasses() {
    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/sections');
  }

  updateClass( classId: string, title: string, type: string ) {
    const update = { title: title, type: type };
    return this.http.put<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/updateSection' + classId, update);
  }

  deleteClass(classId: string) {
    return this.http.delete<{success: boolean, message: string, data: any}>(ENV.apiURL + '/api/deleteSection' + classId);
  }

}


