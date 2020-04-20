import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ResultService } from '@app/services';
import { isPlatformBrowser, Location } from '@angular/common';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { BoardService } from '@app/services';
import { NgForm } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-enter-rollno',
  templateUrl: './enter-rollno.component.html',
  styleUrls: ['./enter-rollno.component.scss']
})
export class EnterRollNoComponent implements OnInit, OnDestroy {

  // @ts-ignore
  @ViewChild('resultPage') resultPage: ElementRef;

  selectedBoardKey;
  selectedClass;
  selectedYear;
  selectedExamType;
  selectedBoard;
  resultTitle;
  resultDescription;
  resultData;
  tags = [];
  result = 'NO RESULT FOUND';
  isLoading = false;
  isError = false;
  errorMsg = '';
  url = '';
  announced = false;
  announceDate = '';
  paramSubscription$: any;
  resultSubscription$: any;
  commentName = '';
  commentText = '';
  comments = [];
  showComments = false;
  addCommentSubscription$: any;
  isValidCommentName = false;
  isValidCommentText = false;
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
  // @ts-ignore
  @ViewChild('subheader')
  subheader: ElementRef;

  constructor(private route: ActivatedRoute,
              private resultService: ResultService,
              private boardService: BoardService,
              private _location: Location,
              private router: Router, @Inject(PLATFORM_ID) private platformId: Object,
              public meta: Meta, public title: Title) { }

  ngOnInit() {

    this.resultTitle = '';

    this.paramSubscription$ = this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has('boardKey')) {

        this.selectedBoardKey = paramMap.get('boardKey');

        this.selectedBoard = this.selectedBoardKey && this.selectedBoardKey.replace(/-/g, ' ');

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

        this.getResultTitleAndDescription();

      }

    });

    if (isPlatformBrowser(this.platformId)) {
      this.resultPage.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }

  }

  getResultTitleAndDescription() {

    if (this.selectedExamType && this.selectedExamType === 'test') {

      this.resultTitle = `${this.selectedClass} Result ${this.selectedYear}`;

      this.resultDescription = `Result of ${this.selectedClass} ${this.selectedYear}`;

    } else {

      this.resultTitle = `${this.selectedBoard} ${this.selectedClass} Class ${this.selectedExamType} Result ${this.selectedYear}`;

      // tslint:disable-next-line:max-line-length
      this.resultDescription = `${this.selectedExamType} result of ${this.selectedClass} class ${this.selectedBoard} board ${this.selectedYear}`;

    }

    this.title.setTitle(this.resultTitle);

    this.meta.updateTag({ name: 'description', content: this.resultDescription });

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

      // tslint:disable-next-line:max-line-length
      this.resultSubscription$ = this.resultService.getResult(this.selectedClass, this.selectedBoardKey, this.selectedYear, this.selectedExamType)
        .subscribe(

          response => {

            this.resultData = response.data;

            if (this.resultData) {

              this.announced = this.resultData.status;

              if (!this.announced) {

                // tslint:disable-next-line:max-line-length
                if (this.resultData.announceDate) {

                  const annDate = new Date(this.resultData.announceDate);
                  // tslint:disable-next-line:max-line-length
                  this.announceDate = `${annDate.getDate()}/${annDate.getMonth() + 1}/${annDate.getFullYear()}`;

                }

                this.isLoading = false;

              }

              this.tags = this.resultData.tags;

              this.url = this.resultData.resultUrl;

              if (this.resultData.comments) {

                this.comments = this.resultData.comments;

                this.comments.reverse();

                this.showComments = true;

              }

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

    this.router.navigate(['']);

  }

  validateCommentName(event) {

    if (event) {

      this.commentName = event.target.value;

      if (!this.commentName || this.commentName === '' || this.commentName.length < 2) {

        this.isValidCommentName = false;

        return;

      }

      this.isValidCommentName = true;

    }

  }

  validateCommentText(event) {

    if (event) {

      this.commentText = event.target.value;

      if (!this.commentText || this.commentText === '' || this.commentText.length < 2) {

        this.isValidCommentText = false;

        return;

      }

      this.isValidCommentText = true;

    }

  }

  addComment (form: NgForm) {

    if (form.invalid) {
      return;
    }

    if (this.isValidCommentName && this.isValidCommentText) {

      const comment = {
        name: this.commentName,
        text: this.commentText
      };

      this.isLoading = true;

      this.addCommentSubscription$ = this.resultService.addComment(this.resultData._id, comment)
        .subscribe(
        response => {

          this.comments.reverse();

          this.comments.push(response.data);

          this.comments.reverse();

          form.resetForm();

          this.isLoading = false;

        },
        error => {

          this.isLoading = false;

        });

    }

  }

  ngOnDestroy() {

    // tslint:disable-next-line:no-unused-expression
    this.paramSubscription$ && this.paramSubscription$.unsubscribe();

    // tslint:disable-next-line:no-unused-expression
    this.resultSubscription$ && this.resultSubscription$.unsubscribe();

    // tslint:disable-next-line:no-unused-expression
    this.addCommentSubscription$ && this.addCommentSubscription$.unsubscribe();

  }

}
