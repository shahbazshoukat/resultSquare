import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResultService } from 'src/app/services/result.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';
import { AlertService } from 'ngx-alerts';
import {createOutput} from '@angular/compiler/src/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {

  isLoading = true;
  results = [];
  resultsSub: any;
  removeResultSub: any;
  paramSub: any;
  selectedBoardKey;
  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json'
  };

  loadingAnim: AnimationItem;

  constructor(private resultService: ResultService, private router: Router, private alertService: AlertService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.isLoading = true;

    this.paramSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {

      this.isLoading = true;

      if (paramMap.has('boardKey')) {

        this.selectedBoardKey = paramMap.get('boardKey');

        this.resultsSub = this.resultService.getResultsByBoardKey(this.selectedBoardKey).subscribe(
          response => {
            if (response.data) {
              this.results = response.data;
              this.isLoading = false;
            }
          },
          error => {
            this.isLoading = false;
            if (error && error.error && error.error.message) {
              this.alertService.danger(error.error.message);
            }
          });

      }

    });

  }

  loadingAnimationCreated(animationItem: AnimationItem): void {

    this.loadingAnim = animationItem;

  }

  editResult(resultId) {
    this.router.navigate(['/rs-admin/add-result', {resultId: resultId, boardKey: this.selectedBoardKey}]);
  }

  removeResult(resultId: string, year: string) {
    const resultYear = prompt('Are you mad? Enter reault year to remove.');

    if (resultYear === year) {
      this.isLoading = true;
      this.removeResultSub = this.resultService.deleteResult(resultId).subscribe(
          response => {
            if (response.success && response.message) {
              this.results.forEach((res, index) => {
                if (res._id === resultId) {
                  this.results.splice(index, 1);
                }
              });
              this.isLoading = false;
              this.alertService.success(response.message);
            }
          },
          error => {
            this.isLoading = false;
            if (error && error.error && error.error.message) {
              this.alertService.danger(error.error.message);
            }
          });
    } else {
      this.alertService.warning('Invalid year');
    }

  }

  changeResultStatus(result: any) {
    this.isLoading = true;
    this.resultService.changeResultStatus(result._id, !result.status).subscribe(
      response => {
      if (response.success && response.message) {
        this.isLoading = false;
        this.alertService.success(response.message);
      }
    },
    error => {
      this.isLoading = false;
      if (error && error.error && error.error.message) {
        this.alertService.danger(error.error.message);
      }
    });
  }

  ngOnDestroy() {

    this.resultsSub && this.resultsSub.unsubscribe();
    this.removeResultSub && this.removeResultSub.unsubscribe();

  }

}
