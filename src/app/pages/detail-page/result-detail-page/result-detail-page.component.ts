import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ResultService } from '@app/services';
import { Location } from '@angular/common';
import { AnimationOptions } from 'ngx-lottie';
import { BoardService } from '@app/services';
import { NgForm } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment as ENV } from '@env/environment';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-detail-page.component.html',
  styleUrls: ['./result-detail-page.component.scss']
})
export class ResultDetailPageComponent implements OnInit, OnDestroy {

  url = '';
  tags = [];
  alive = true;
  errorMsg = '';
  comments = [];
  blocked = false;
  isError = false;
  resultData: any;
  boardTitle: any;
  commentName = '';
  commentText = '';
  resultTitle: any;
  commentEmail = '';
  announced = false;
  selectedYear: any;
  isLoading = false;
  selectedClass: any;
  showComments = false;
  addingComment = false;
  selectedExamType: any;
  resultDescription: any;
  announceStatus: string;
  isValidCommentName = false;
  isValidCommentText = false;
  isValidCommentEmail = false;
  selectedBoardDomain: string;
  hostAddress = `${window.location.protocol}//${ENV.host}`;
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

  dotsLoaderAnimOptions: AnimationOptions = {
    path: '/assets/lib/dots-loader-circle.json',
    loop: true,
    autoplay: true
  };

  examsOptions: AnimationOptions = {
    path: '/assets/lib/exams.json',
    loop: true,
    autoplay: true
  };

  constructor(private meta: Meta,
              private title: Title,
              private router: Router,
              private _location: Location,
              private route: ActivatedRoute,
              private boardService: BoardService,
              private resultService: ResultService,
              private loadingBar: LoadingBarService) {

    this.route.paramMap.pipe(takeWhile(this.isAlive)).subscribe((paramMap: ParamMap) => {

      if (paramMap) {

        if (paramMap.has('boardDomain')) {

          this.selectedBoardDomain = paramMap.get('boardDomain');

        }

        if (paramMap.has('classTitle')) {

          this.selectedClass = paramMap.get('classTitle');

        }

        if (paramMap.has('year')) {

          this.selectedYear = paramMap.get('year');

        }

        if (paramMap.has('examType')) {

          this.selectedExamType = paramMap.get('examType');

        }

      }

    });

  }

  ngOnInit() {

    this.resultTitle = '';

    this.getResult();

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

    } else {

      this.resultTitle = `${this.boardTitle} ${this.selectedClass} ${this.selectedExamType} Result ${this.selectedYear}`;

    }

    this.title.setTitle(this.resultTitle);

  }

  getResult() {

    if (this.selectedClass && this.selectedBoardDomain && this.selectedYear && this.selectedExamType) {

      this.announced = false;

      this.isLoading = true;

      this.isError = false;

      this.errorMsg = '';

      this.blocked = false;

      this.resultService.getResult(this.selectedBoardDomain, this.selectedClass, this.selectedYear, this.selectedExamType)
        .pipe(takeWhile(this.isAlive))
        .subscribe(

          response => {

            this.resultData = response.data;

            if (this.resultData) {

              this.announced = this.resultData.status;

              this.announceStatus = this.announced ? 'Announced' : 'Not announced';

              this.tags = this.resultData.tags;

              this.url = this.resultData.resultUrl;

              if (this.resultData.comments) {

                this.comments = this.resultData.comments;

                this.comments.reverse();

                this.showComments = true;

              }

              if (this.resultData.isBlocked && this.announced) {

                this.blocked = true;

              }

              if (this.resultData.board && this.resultData.board.description) {

                this.resultData.board.shortDesc = this.resultData.board.description.substring(0, 110) + '...';

                this.boardTitle = this.resultData.board.title;

              }

              this.getResultTitleAndDescription();

            } else {

              this.isError = true;

              this.errorMsg = 'Result Not Found';

            }

            this.isLoading = false;

            this.removeExistingTags();

            this.setMetaTags();

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

  setResultDescriptionMetaTag() {

    let pageDescription = '';

    if (this.resultData) {

      if (this.resultData.board && this.resultData.board.description) {

        pageDescription = pageDescription + this.resultData.board.description;

      }

      if (this.resultData.description) {

        pageDescription = pageDescription + this.resultData.description;

      }

    }

    this.meta.updateTag({ name: 'description', content: pageDescription });

    this.meta.updateTag({ property: 'og:title', content: this.resultTitle });

    this.meta.updateTag({ property: 'og:description', content: pageDescription });

  }

  setMetaTags() {

    if (Array.isArray(this.tags)) {

      this.meta.updateTag({ name: 'keywords', content: this.tags.toString() });

      this.meta.addTag({ property: 'article:tag', content: 'result'});

      this.meta.addTag({ property: 'article:tag', content: 'resultsquare'});

      this.meta.addTag({ property: 'article:tag', content: 'resultsquare.pk'});

      this.meta.addTag({ property: 'article:tag', content: 'result square pk'});

      this.meta.addTag({ property: 'article:tag', content: this.resultTitle });

      this.tags.forEach(tag => {

        if (tag) {

          this.meta.addTag({ property: 'article:tag', content: tag });

        }

      });

    }

    this.setResultDescriptionMetaTag();

  }

  removeExistingTags() {

    const existingMetaTags = this.meta.getTags('property=\'article:tag\'');

    if (Array.isArray(existingMetaTags)) {

      existingMetaTags.forEach(metaTag => {

        this.meta.removeTagElement(metaTag);

      });

    }

  }

  reload() {

    if (!this.isError && !this.blocked && this.announced && this.url) {

      this.loadingBar.start();

    }

    document.getElementById('resultFrame')['src'] = this.url;

  }

  onPageLoad() {

    this.loadingBar.stop();

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

    if (!form || form.invalid) {
      return;
    }

    if (this.isValidCommentName && this.isValidCommentText && this.isValidCommentEmail) {

      const comment = {
        name: this.commentName,
        text: this.commentText,
        email: this.commentEmail
      };

      this.addingComment = true;

      this.resultService.addComment(this.resultData._id, comment)
        .pipe(takeWhile(this.isAlive))
        .subscribe(
          response => {

            if (response && response.data) {

              this.comments.reverse();

              this.comments.push(response.data);

              this.comments.reverse();

              form.resetForm();

            }

            this.addingComment = false;

          },
          error => {

            this.addingComment = false;

          });

    }

  }

  ngOnDestroy() {

    this.alive = false;

  }

}
