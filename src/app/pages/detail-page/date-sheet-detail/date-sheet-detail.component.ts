import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as Enums from '@app/app.enums';
import { AnimationOptions } from 'ngx-lottie';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BoardService, DateSheetService } from '@app/services';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-date-sheet-detail',
  templateUrl: './date-sheet-detail.component.html',
  styleUrls: ['./date-sheet-detail.component.scss']
})
export class DateSheetDetailComponent implements OnInit, OnDestroy {

  url = '';
  tags = [];
  alive = true;
  errorMsg = '';
  comments = [];
  pageId: string;
  isError = false;
  boardTitle: any;
  isLoading = false;
  dateSheetData: any;
  dateSheetTitle: any;
  selectedYear: string;
  showComments = false;
  selectedClass: string;
  dateSheetDescription: any;
  selectedExamType: string;
  selectedBoardDomain: string;
  commentSourceEnums = Enums.COMMENT_SOURCE;
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

  constructor(private meta: Meta,
              private title: Title,
              private router: Router,
              private _location: Location,
              private route: ActivatedRoute,
              private boardService: BoardService,
              private dateSheetService: DateSheetService,
              private loadingBar: LoadingBarService) {

    // this.boardDomain = this.boardTitle = window.location.hostname.substring(0, window.location.hostname.indexOf('.'));

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

    this.getDateSheet();

    this.dateSheetTitle = '';

    this.getDateSheetTitleAndDescription();

    if (this.resultPage && this.resultPage.nativeElement) {

      this.resultPage.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});

    }

  }

  isAlive = () => {

    return this.alive;

  }

  getDateSheetTitleAndDescription() {

    if (this.dateSheetData) {

      this.dateSheetTitle = this.dateSheetData.title;

      this.dateSheetDescription = this.dateSheetData.description;

      this.title.setTitle(this.dateSheetTitle);

    }

  }

  getDateSheet() {

    if (this.selectedBoardDomain && this.selectedClass && this.selectedExamType && this.selectedExamType) {

      this.isLoading = true;

      this.isError = false;

      this.errorMsg = '';

      const payload = {
        year: this.selectedYear,
        board: this.selectedBoardDomain,
        section: this.selectedClass,
        examType: this.selectedExamType
      };

      this.dateSheetService.getDateSheet(payload)
        .pipe(takeWhile(this.isAlive))
        .subscribe(

          response => {

            this.dateSheetData = response.data;

            if (this.dateSheetData) {

              this.tags = this.dateSheetData.tags;

              this.dateSheetData.examTypeText = this.dateSheetService.getExamType(this.dateSheetData.examType);

              if (this.dateSheetData.comments) {

                this.comments = this.dateSheetData.comments;

                this.comments.reverse();

                this.showComments = true;

              }

              if (this.dateSheetData.board && this.dateSheetData.board.description) {

                this.dateSheetData.board.shortDesc = this.dateSheetData.board.description.substring(0, 110) + '...';

                this.boardTitle = this.dateSheetData.board.title;

              }

              this.getDateSheetTitleAndDescription();

            } else {

              this.isError = true;

              this.errorMsg = 'Date Sheet Not Found';

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

  setDateSheetDescriptionMetaTag() {

    let pageDescription = '';

    if (this.dateSheetData) {

      if (this.dateSheetData.board && this.dateSheetData.board.description) {

        pageDescription = pageDescription + this.dateSheetData.board.description;

      }

      if (this.dateSheetData.description) {

        pageDescription = pageDescription + this.dateSheetData.description;

      }

    }

    this.meta.updateTag({ name: 'description', content: pageDescription });

    this.meta.updateTag({ property: 'og:title', content: this.dateSheetTitle });

    this.meta.updateTag({ property: 'og:description', content: pageDescription });

  }

  setMetaTags() {

    if (Array.isArray(this.tags)) {

      this.meta.updateTag({ name: 'keywords', content: this.tags.toString() });

      this.meta.addTag({ property: 'article:tag', content: 'result'});

      this.meta.addTag({ property: 'article:tag', content: 'resultsquare'});

      this.meta.addTag({ property: 'article:tag', content: 'resultsquare.pk'});

      this.meta.addTag({ property: 'article:tag', content: 'result square pk'});

      this.meta.addTag({ property: 'article:tag', content: this.dateSheetTitle });

      this.tags.forEach(tag => {

        if (tag) {

          this.meta.addTag({ property: 'article:tag', content: tag });

        }

      });

    }

    this.setDateSheetDescriptionMetaTag();

  }

  removeExistingTags() {

    const existingMetaTags = this.meta.getTags('property=\'article:tag\'');

    if (Array.isArray(existingMetaTags)) {

      existingMetaTags.forEach(metaTag => {

        this.meta.removeTagElement(metaTag);

      });

    }

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

  ngOnDestroy() {

    this.alive = false;

  }

}