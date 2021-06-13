import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationInstance} from 'ngx-pagination';
import {AnimationOptions} from 'ngx-lottie';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {BoardService, ClassService, DateSheetService, ResultService} from '@app/services';
import {environment as ENV} from '@env/environment';
import {takeWhile} from 'rxjs/operators';
import * as Enums from '@app/app.enums';

@Component({
  selector: 'app-board-results',
  templateUrl: './board-results.component.html',
  styleUrls: ['./board-results.component.scss']
})
export class BoardResultsComponent implements OnInit, OnDestroy {

  pages: any;
  result: any;
  boards = [];
  alive = true;
  classes = [];
  results = [];
  errorMsg = '';
  boardData: any;
  isError = false;
  isLoading = true;
  allEnums = Enums;
  totalResults = 0;
  selectedPageNo = 1;
  boardDomain: string;
  selectedBoard: string;
  hostAddress = `${window.location.protocol}//${ENV.host}`;
  provinces = [
    'All',
    'Punjab',
    'KPK',
    'Sindh',
    'Balochistan',
    'AJK',
    'Federal'
  ];

  config: PaginationInstance = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: this.totalResults
  };

  status: {
    Announced: { value: true, selected: true},
    UnAnnounced: { value: false, selected: false}
  };

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

  constructor(private meta: Meta,
              private title: Title,
              private router: Router,
              private route: ActivatedRoute,
              private classService: ClassService,
              private boardService: BoardService,
              private resultService: ResultService) {

  }

  ngOnInit() {

    this.title.setTitle(ENV.pageTitle);

    this.boardDomain = window.location.hostname && window.location.hostname.substring(0, window.location.hostname.indexOf('.'));

    this.getResultsByBoardDomain();

  }

  isAlive = () => {

    return this.alive;

  }

  getResultsByBoardDomain() {

    this.isLoading = true;

    this.resultService.getResultsByBoardDomain(this.boardDomain).pipe(takeWhile(this.isAlive))
      .subscribe(
        response => {

          if (response && response.data) {

            this.results = response.data.results;

            this.boardData = response.data.board;

            if (this.boardData && this.boardData.description) {

              this.boardData.shortDesc = this.boardData.description.substring(0, 110) + '...';

              this.selectedBoard = this.boardData.title;

            }

            if (this.results) {

              this.totalResults = this.results && this.results.length;

            } else {

              this.isError = true;

              this.errorMsg = '404 - Not Found';

            }

          }

          this.removeExistingTags();

          this.addMetaTags();

          this.isLoading = false;

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

  addMetaTags() {

    if (Array.isArray(this.results)) {

      const keyWords = [];

      this.meta.addTag({ property: 'article:tag', content: 'result'});

      this.meta.addTag({ property: 'article:tag', content: 'resultsquare'});

      this.meta.addTag({ property: 'article:tag', content: 'resultsquare.pk'});

      this.meta.addTag({ property: 'article:tag', content: 'result square pk'});

      this.results.forEach(result => {

        if (result && result.year && result.section && result.section.title && result.board && result.board.title) {

          const tagContent = `${result.board.title} ${result.section.title} result ${result.year}`;

          keyWords.push(tagContent);

          this.meta.addTag({ property: 'article:tag', content: tagContent });

        }

      });

      if (this.boardData && Array.isArray(this.boardData.tags)) {

        this.boardData.tags.forEach(tag => {

          if (tag) {

            this.meta.addTag({ property: 'article:tag', content: tag });

          }

        });

      }

      this.meta.updateTag({ name: 'keywords', content: keyWords && keyWords.toString() });

    }

  }

  removeExistingTags() {

    const existingMetaTags = this.meta.getTags('property=\'article:tag\'');

    if (Array.isArray(existingMetaTags)) {

      existingMetaTags.forEach(metaTag => {

        this.meta.removeTagElement(metaTag);

      });

    }

  }

  onPageChange(event) {

    this.config.currentPage = event;

  }

  retry() {

    this.getResultsByBoardDomain();

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

      let examType = 'annual';

      if (result.examType === Enums.EXAM_TYPE.ANNUAL) {

        examType = 'annual';

      } else if (result.examType === Enums.EXAM_TYPE.SUPPLY) {

        examType = 'supply';

      } else if (result.examType === Enums.EXAM_TYPE.TEST) {

        examType = 'test';

      }

      this.router.navigate(['/results' + '/' + result.section.title + '/' + examType + '/' + result.year]);

    }

  }

  viewDateSheet(dateSheet) {

    // tslint:disable-next-line:max-line-length
    window.location.href = `${window.location.protocol}//${dateSheet.board.domain}.${ENV.host}/date-sheets/${dateSheet.pageId}`;

  }

  ngOnDestroy() {

    this.alive = false;

  }

}
