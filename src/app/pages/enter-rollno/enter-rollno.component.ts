import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import {Location} from '@angular/common';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import {BoardService} from '../../services/board.service';

@Component({
  selector: 'app-enter-rollno',
  templateUrl: './enter-rollno.component.html',
  styleUrls: ['./enter-rollno.component.scss']
})
export class EnterRollNoComponent implements OnInit, OnDestroy {

  selectedBoardKey;
  selectedClass;
  selectedYear;
  selectedExamType;
  selectedBoard;
  selectedTest;
  selectedUniKey;
  selectedUni;
  isTest = false;
  isUni = false;
  resultTitle;
  resultData;
  tags = [];
  result = 'NO RESULT FOUND';
  isLoading = false;
  isError = false;
  errorMsg = '';
  url = '';
  announced = false;
  announceDate = '';
  paramSub: any;
  serviceSub: any;
  notAnnouncedAnimOptions: AnimationOptions = {
    path: '/assets/lib/not-announced.json'
  };

  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json'
  };

  loadingAnim: AnimationItem;

  notAnnouncedAnim: AnimationItem;

  errorAnimOptions: AnimationOptions = {
    path: '/assets/lib/error.json'
  };

  errorAnim: AnimationItem;

  constructor(private route: ActivatedRoute,
              private resultService: ResultService,
              private boardService: BoardService,
              private _location: Location,
              private router: Router) { }

  ngOnInit() {

    this.isTest = false;

    this.isUni = false;

    this.resultTitle = '';

    this.paramSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has('testTitle')) {

        this.selectedTest = paramMap.get('testTitle');

        this.isTest = true;

        this.announced = true;

        this.resultTitle = `${this.selectedTest} Result`;

        this.getTestBoard();

      } else if (paramMap.has('uniKey')) {

        this.selectedUniKey = paramMap.get('uniKey');

        this.selectedUni = this.selectedUniKey.replace(/-/g, ' ');

        this.isUni = true;

        this.announced = true;

        if (paramMap.has('classTitle')) {

          this.selectedClass = paramMap.get('classTitle');

        }

        this.resultTitle = `${this.selectedUni} ${this.selectedClass} Result`;

        this.getUniBoard();


      } else if (paramMap.has('boardKey')) {

        this.selectedBoardKey = paramMap.get('boardKey');

        this.selectedBoard = this.selectedBoardKey.replace(/-/g, ' ');

        if (paramMap.has('classTitle')) {

          this.selectedClass = paramMap.get('classTitle');

        }

        if (paramMap.has('year')) {

          this.selectedYear = paramMap.get('year');

        }

        if (paramMap.has('examType')) {

          this.selectedExamType = paramMap.get('examType');

          this.getResult();

        }

        this.resultTitle = `${this.selectedBoard} ${this.selectedClass} Class ${this.selectedExamType} Result ${this.selectedYear}`;

      }

    });

  }

  notAnnouncedAnimationCreated(animationItem: AnimationItem): void {

    this.notAnnouncedAnim = animationItem;

  }

  loadingAnimationCreated(animationItem: AnimationItem): void {

    this.loadingAnim = animationItem;

  }

  errorAnimationCreated(animationItem: AnimationItem): void {

    this.errorAnim = animationItem;

  }

  getTestBoard() {

    if (this.selectedTest) {

      this.isLoading = true;

      this.isError = false;

      this.errorMsg = '';

      this.serviceSub = this.boardService.getBoardBySectionTitle(this.selectedTest)
        .subscribe(

          response => {

            this.resultData = response.data[0];

            if (this.resultData && this.resultData.isBlocked) {

              window.open(this.url, '_blank');

            }

            if (this.resultData) {

              this.tags = this.resultData.tags;

              this.url = this.resultData.resultUrl;

              if (this.resultData.isBlocked) {

                window.open(this.url, '_blank');

              }

            } else {

              this.isLoading = false;

              this.isError = true;

              this.errorMsg = 'Result Not Found';

            }

          },
          error => {

            this.isLoading = false;

            this.isError = true;

            if (error && error.status && error.status === 404) {

              this.errorMsg = '404 - Not Found';

            } else {

              this.errorMsg = 'Something went wrong';

            }

          });

    }

  }

  getUniBoard() {

    if (this.selectedUniKey) {

      this.isLoading = true;

      this.isError = false;

      this.errorMsg = '';

      this.serviceSub = this.boardService.getBoardByKey(this.selectedUniKey)
        .subscribe(

          response => {

            this.resultData = response.data;

            if (this.resultData) {

              this.tags = this.resultData.tags;

              this.url = this.resultData.resultUrl;

              if (this.resultData.isBlocked) {

                window.open(this.url, '_blank');

              }

            } else {

              this.isLoading = false;

              this.isError = true;

              this.errorMsg = 'Result Not Found';

            }

          },
          error => {

            this.isLoading = false;

            this.isError = true;

            if (error && error.status && error.status === 404) {

              this.errorMsg = '404 - Not Found';

            } else {

              this.errorMsg = 'Something went wrong';

            }

          });

    }

  }

  getResult() {

    if (this.selectedClass && this.selectedBoardKey && this.selectedYear && this.selectedExamType) {

      this.announced = false;

      this.isLoading = true;

      this.isError = false;

      this.errorMsg = '';

      this.serviceSub = this.resultService.getResult(this.selectedClass, this.selectedBoardKey, this.selectedYear, this.selectedExamType)
        .subscribe(

          response => {

            this.resultData = response.data;

            if (this.resultData) {

              this.announced = this.resultData.status;

              if (!this.announced) {

                this.isLoading = false;

                if (this.resultData.announceDate && this.resultData.announceDate.day && this.resultData.announceDate.month && this.resultData.announceDate.year) {

                  this.announceDate = `${this.resultData.announceDate.day}/${this.resultData.announceDate.month}/${this.resultData.announceDate.year}`;

                }

              }

              this.tags = this.resultData.tags;

              this.url = this.resultData.resultUrl;

              if (this.resultData.isBlocked && this.announced) {

                window.open(this.url, '_blank');

              }

            } else {

              this.isLoading = false;

              this.isError = true;

              this.errorMsg = 'Result Not Found';

            }

          },
          error => {

            this.isLoading = false;

            this.isError = true;

            if (error && error.status && error.status === 404) {

              this.errorMsg = '404 - Not Found';

            } else {

              this.errorMsg = 'Something went wrong';

            }

          });

    }

  }

  reload() {

    this.isLoading = true;

    document.getElementById('resultFrame')['src'] = this.url;

  }

  navigateToBoardResultPage() {

    window.open(this.url, '_blank');

  }

  backToHome() {

    this.router.navigate(['']);

  }

  goBack() {

    if (this.isTest) {

      this.router.navigate(['']);

    } else if (this.isUni) {

      this.router.navigate(['/result', this.selectedClass]);

    } else {

      this.router.navigate(['/result' + '/' + this.selectedClass + '/' + this.selectedBoardKey, this.selectedYear]);

    }

  }

  ngOnDestroy() {

    this.paramSub && this.paramSub.unsubscribe();

    this.serviceSub && this.serviceSub.unsubscribe();

  }

}
