import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ResultService } from '@app/services';
import { Location } from '@angular/common';
import { AnimationOptions } from 'ngx-lottie';
import { BoardService } from '@app/services';
import { NgForm } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit, OnDestroy {

  url = '';
  tags = [];
  alive = true;
  errorMsg = '';
  comments = [];
  blocked = false;
  isError = false;
  resultData: any;
  commentName = '';
  commentText = '';
  resultTitle: any;
  commentEmail = '';
  announced = false;
  selectedYear: any;
  isLoading = false;
  selectedClass: any;
  selectedBoard: any;
  showComments = false;
  selectedBoardKey: any;
  selectedExamType: any;
  resultDescription: any;
  announceStatus: string;
  result = 'NO RESULT FOUND';
  isValidCommentName = false;
  isValidCommentText = false;
  isValidCommentEmail = false;
  @ViewChild('subheader', { static: false }) subheader: ElementRef;
  @ViewChild('resultPage', { static: false }) resultPage: ElementRef;

  errorAnimOptions: AnimationOptions = {
    path: '/assets/lib/error.json',
    loop: true,
    autoplay: true
  };

  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json',
    loop: true,
    autoplay: true
  };

  notAnnouncedAnimOptions: AnimationOptions = {
    path: '/assets/lib/not-announced.json',
    loop: true,
    autoplay: true
  };

  constructor(private router: Router,
              private _location: Location,
              private route: ActivatedRoute,
              private boardService: BoardService,
              private resultService: ResultService) { }

  ngOnInit() {

    this.resultTitle = '';

    this.route.paramMap.pipe(takeWhile(this.isAlive)).subscribe((paramMap: ParamMap) => {

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

    if (this.resultPage && this.resultPage.nativeElement) {

      this.resultPage.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});

    }

  }

  isAlive = () => {

    return this.alive;

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

  }

  getResult() {

    if (this.selectedClass && this.selectedBoardKey && this.selectedYear && this.selectedExamType) {

      this.announced = false;

      this.isLoading = true;

      this.isError = false;

      this.errorMsg = '';

      this.blocked = false;

      this.resultService.getResult(this.selectedClass, this.selectedBoardKey, this.selectedYear, this.selectedExamType)
        .pipe(takeWhile(this.isAlive))
        .subscribe(

          response => {

            this.resultData = response.data;

            if (this.resultData) {

              this.announced = this.resultData.status;

              if (!this.announced) {

                this.isLoading = false;

                this.announceStatus = 'Not announced';

              } else {

                this.announceStatus = 'Announced';

              }

              this.tags = this.resultData.tags;

              this.url = this.resultData.resultUrl;

              if (this.resultData.comments) {

                this.comments = this.resultData.comments;

                this.comments.reverse();

                this.showComments = true;

              }

              if (this.resultData.isBlocked && this.announced) {

                this.blocked = true;
                // window.open(this.url, '_blank');

                this.isLoading = false;

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

  validateCommentEmail(event) {

    if (event) {

      this.commentEmail = event.target.value;

      if (!this.commentEmail || this.commentEmail === '' || this.commentEmail.length < 2) {

        this.isValidCommentEmail = false;

        return;

      }

      this.isValidCommentEmail = true;

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

    if (this.isValidCommentName && this.isValidCommentText && this.isValidCommentEmail) {

      const comment = {
        name: this.commentName,
        text: this.commentText,
        email: this.commentEmail
      };

      this.isLoading = true;

      this.resultService.addComment(this.resultData._id, comment)
        .pipe(takeWhile(this.isAlive))
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

    this.alive = false;

  }

}
