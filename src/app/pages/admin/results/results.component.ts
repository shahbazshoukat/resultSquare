import { Component, OnInit } from '@angular/core';
import { ResultService } from 'src/app/services/result.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  isLoading = true;
  results = [];

  constructor(private resultService: ResultService, private router: Router) { }

  ngOnInit() {
    this.resultService.getAllResultes().subscribe(response => {
      if (response.data) {
        this.results = response.data;
        console.log(this.results);
        this.isLoading = false;
      }
    });
  }

  editResult(resultId) {
    this.router.navigate(['/rs-admin/add-result', {resultId: resultId}]);
  }

  removeResult(resultId: string) {
    this.resultService.deleteResult(resultId).subscribe(response => {
      if (response.success && response.message) {
        this.results.forEach((res, index) => {
          if (res._id === resultId) {
            this.results.splice(index, 1);
          }
        });
        alert(response.message);
      }
    });
  }

  changeResultStatus(result: any) {
    this.resultService.changeResultStatus(result._id, !result.status).subscribe(response => {
      if (response.success && response.message) {
        alert(response.message);
      }
    });
  }

}
