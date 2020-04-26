import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ResultService} from '@app/services';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';
import * as Enums from '@app/app.enums';
import {PaginationInstance} from 'ngx-pagination';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnInit, OnDestroy {

  selectedBoard: string;
  selectedSection: string;
  resultSubscription$: any;
  routeSubscription$: any;
  results = [];
  isError = false;
  errorMsg = '';
  isLoading = false;
  totalResults = 0;
  selectedPageNo = 1;
  config: PaginationInstance = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: this.totalResults
  };

  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json'
  };

  loadingAnim: AnimationItem;
  errorAnimOptions: AnimationOptions = {
    path: '/assets/lib/error.json'
  };

  errorAnim: AnimationItem;

  constructor(private router: Router, private route: ActivatedRoute, private resultService: ResultService) { }

  ngOnInit() {

    this.routeSubscription$ = this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has('class') && paramMap.has('board')) {

        this.selectedSection = paramMap.get('class');

        this.selectedBoard = paramMap.get('board');

        this.getResultsBySectionAndBoard();

      } else if (paramMap.has('board')) {

        this.selectedBoard = paramMap.get('board');

        this.getResultsByBoardKey();

      }

    });

  }

  loadingAnimationCreated(animationItem: AnimationItem): void {

    this.loadingAnim = animationItem;

  }

  errorAnimationCreated(animationItem: AnimationItem): void {

    this.errorAnim = animationItem;

  }

  getResultsByBoardKey() {

    if (this.selectedBoard) {

      this.isLoading = true;

      this.isError = false;

      this.errorMsg = '';

      this.resultSubscription$ = this.resultService.getResultsByBoardKey(this.selectedBoard)
        .subscribe(
          response => {

            if (response && response.data) {

              this.results = response.data;

              if (!this.results || this.results.length === 0) {

                this.isError = true;

                this.errorMsg = '404 - Not Found';

              }

              this.totalResults = this.results && this.results.length;

            }

            this.isLoading = false;

          },
          error => {

            if (error && error.error && error.error.message) {

              this.isError = true;

              this.errorMsg = 'Something Went Wrong';

            }

            this.isLoading = false;

          }
        );

    }

  }

  getResultsBySectionAndBoard() {

    if (this.selectedBoard && this.selectedSection) {

      this.isLoading = true;

      this.isError = false;

      this.errorMsg = '';

      this.resultSubscription$ = this.resultService.getResultsBySectionAndBoard(this.selectedSection, this.selectedBoard)
        .subscribe(
          response => {

            if (response && response.data) {

              this.results = response.data;

              if (!this.results || this.results.length === 0) {

                this.isError = true;

                this.errorMsg = '404 - Not Found';

              }

              this.totalResults = this.results && this.results.length;

            }

            this.isLoading = false;

          },
          error => {

            if (error && error.error && error.error.message) {

              this.isError = true;

              this.errorMsg = 'Something Went Wrong';

            }

            this.isLoading = false;

          }
        );

    }

  }

  retry () {

  }

  extractExamType(exam) {

    if (exam === Enums.EXAM_TYPE.ANNUAL) {

      return 'Class Annual';

    } else if (exam === Enums.EXAM_TYPE.SUPPLY) {

      return 'Class Supply';

    } else if (exam === Enums.EXAM_TYPE.TEST) {

      return 'Test';

    }

  }

  viewResult(result) {

    if (result) {

      let eType = 'annual';

      if (result.examType === Enums.EXAM_TYPE.ANNUAL) {

        eType = 'annual';

      } else if (result.examType === Enums.EXAM_TYPE.SUPPLY) {

        eType = 'supply';

      } else if (result.examType === Enums.EXAM_TYPE.TEST) {

        eType = 'test';

      }

      this.router.navigate(['/result' + '/' + result.section.title + '/' + result.board.key + '/' + result.year + '/' + eType]);

    }

  }

  ngOnDestroy () {

    this.resultSubscription$ && this.resultSubscription$.unsubscribe();
    this.routeSubscription$ && this.routeSubscription$.unsubscribe();

  }

}
