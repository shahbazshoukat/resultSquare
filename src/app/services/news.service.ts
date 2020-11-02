import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class NewsService {

  constructor (private http: HttpClient) {}

  getAllNews() {

    return this.http.get<{success: boolean, message: string, data: any}>('/api/news');

  }

}


