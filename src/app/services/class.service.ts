import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ClassService {

  constructor (private http: HttpClient) {}

  getAllClasses() {
    return this.http.get<{success: boolean, message: string, data: any}>('/api/sections');
  }

}


