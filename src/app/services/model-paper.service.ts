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

  getModelPapersByBoardDomain(domain) {

    return this.http.get<APIResponse>(ENV.apiUrl + `/api/board-model-papers/${domain}`);

  }

  getModelPaper(params) {

    return this.http.get<APIResponse>(ENV.apiUrl + `/api/model-paper/${params.section}/${params.subject}`);

  }

  getModelPaperByPageId(pageId) {

    return this.http.get<APIResponse>(ENV.apiUrl + `/api/model-papers/${pageId}`);

  }

  addComment(resultId, comment) {

    return this.http.post<APIResponse>(ENV.apiUrl + `/api/comment/${resultId}`, comment);

  }

}
