import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@env/environment';
import { APIResponse } from '@app/models';

@Injectable({providedIn: 'root'})
export class ModelPaperService {

  constructor (private http: HttpClient) {}

  getLatestModelPapers() {

    return this.http.get<APIResponse>(ENV.apiUrl + '/api/model-papers/latest');

  }

  getModelPaper(params) {

    return this.http.get<APIResponse>(ENV.apiUrl + `/api/model-paper/${params.board}/${params.section}/${params.subject}`);

  }

  addComment(modelPaperId, comment) {

    return this.http.post<APIResponse>(ENV.apiUrl + `/api/model-papers/comment/add/${modelPaperId}`, comment);

  }

}
