import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@env/environment';

@Injectable({providedIn: 'root'})
export class ClassService {

  constructor (private http: HttpClient) {}

  getAllClasses() {

    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiUrl + '/api/sections');

  }

}


