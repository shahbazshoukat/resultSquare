import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@env/environment';

@Injectable({providedIn: 'root'})
export class NewsService {

  constructor (private http: HttpClient) {}

  getAllNews() {

    return this.http.get<{success: boolean, message: string, data: any}>(ENV.apiUrl + '/api/news');

  }

}


