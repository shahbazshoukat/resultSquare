import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import {Location} from '@angular/common';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

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
              private _location: Location,
              private router: Router) { }

  ngOnInit() {

    this.paramSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if(paramMap.has("boardKey")) {

        this.selectedBoardKey = paramMap.get("boardKey");

        this.selectedBoard = this.selectedBoardKey.replace(/-/g, ' ');

      }

      if(paramMap.has("classTitle")) {

        this.selectedClass = paramMap.get("classTitle");

      }

      if(paramMap.has("year")) {

        this.selectedYear = paramMap.get("year");

      }

      if(paramMap.has("examType")) {

        this.selectedExamType = paramMap.get("examType");

        this.getResult();

      }

      this.resultTitle = `${this.selectedBoard} ${this.selectedClass} Class ${this.selectedExamType} Result ${this.selectedYear}`;

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

  printResult() {

    window.print();

  }

  reload() {

    this.isLoading = true;

    document.getElementById('resultFrame').src = this.url;

  }

  backToHome() {

    this.router.navigate(['']);

  }

  ngOnDestroy() {

    this.paramSub && this.paramSub.unsubscribe();

    this.serviceSub && this.serviceSub.unsubscribe();

  }

}
