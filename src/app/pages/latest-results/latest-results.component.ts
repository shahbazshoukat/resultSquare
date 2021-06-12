import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationInstance} from 'ngx-pagination';
import {AnimationOptions} from 'ngx-lottie';
import {Meta, Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {BoardService, ClassService, ResultService} from '@app/services';
import {environment as ENV} from '@env/environment';
import {takeWhile} from 'rxjs/operators';
import * as Enums from '@app/app.enums';

@Component({
  selector: 'app-latest-results',
  templateUrl: './latest-results.component.html',
  styleUrls: ['./latest-results.component.scss']
})
export class LatestResultsComponent implements OnInit, OnDestroy {

  pages: any;
  result: any;
  boards = [];
  alive = true;
  classes = [];
  results = [];
  errorMsg = '';
  isError = false;
  isLoading = true;
  totalResults = 0;
  selectedPageNo = 1;
  filteredBoards = [];
  filteredResults = [];
  selectedNavItem: any;
  selectedStatus = true;
  selectedClass = 'default';
  selectedBoardKey = 'default';
  sliderTitle = 'Resultsquare.pk';
  sliderDescription = 'View latest educational updates from all over the Pakistan';

  provinces = [
    {
      label: 'All',
      key: 'all'
    },
    {
      label: 'Federal',
      key: 'federal'
    },
    {
      label: 'Punjab',
      key: 'punjab'
    },
    {
      label: 'KPK',
      key: 'kpk'
    },
    {
      label: 'Sindh',
      key: 'sindh'
    },
    {
      label: 'Balochistan',
      key: 'balochistan'
    },
    {
      label: 'AJK',
      key: 'ajk'
    }
  ];
  selectedProvince = this.provinces[0];

  miniNavItems = [
    {
      label: 'Results',
      key: Enums.MINI_NAV_ITEMS.RESULTS,
      pageTitle: 'Latest Results'
    },
    {
      label: 'Date Sheets',
      key: Enums.MINI_NAV_ITEMS.DATE_SHEETS,
      pageTitle: 'Date Sheets'
    },
    {
      label: 'Model Papers',
      key: Enums.MINI_NAV_ITEMS.MODEL_PAPERS,
      pageTitle: 'Model Papers'
    },
    {
      label: 'Past Papers',
      key: Enums.MINI_NAV_ITEMS.PAST_PAPERS,
      pageTitle: 'Past Papers'
    }
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
              private classService: ClassService,
              private boardService: BoardService,
              private resultService: ResultService) { }

  ngOnInit() {

    this.title.setTitle(ENV.pageTitle);

    this.getClasses();

    this.getAllBoards();

    this.getLatestResults();

  }

  isAlive = () => {

    return this.alive;

  }

  getClasses() {

    this.isLoading = true;

    this.isError = false;

    this.errorMsg = '';

    this.selectedClass = 'default';

    this.classService.getAllClasses().pipe(takeWhile(this.isAlive))
      .subscribe(
        response => {

          if (response.success && response.data) {

            this.classes = response.data;

            if (!this.classes || this.classes.length === 0) {

              this.isError = true;

              this.errorMsg = 'No Class Found';

            }

            // this.isLoading = false;

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

  getAllBoards() {

    this.isError = false;

    this.errorMsg = '';

    this.boardService.getAllBoards().pipe(takeWhile(this.isAlive)).subscribe(
      response => {

        this.boards = response.data;

        this.filteredBoards = this.boards;

        if (!this.boards || this.boards.length === 0) {

          this.isError = true;

          this.errorMsg = `404 - Not Found`;

        }

        // this.isLoading = false;

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

  getLatestResults() {

    this.isLoading = true;

    this.resultService.getLatestResults().pipe(takeWhile(this.isAlive))
      .subscribe(
        response => {

          if (response && response.data) {

            this.results = response.data;

            if (this.results) {

              this.filteredResults = this.results;

              this.selectedProvince = this.provinces[0];

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

  filterByProvince(province) {

    this.selectedProvince = province;

    if (this.selectedProvince) {

      this.selectedBoardKey = 'default';

      this.selectedClass = 'default';

      this.filterResults();

      if (this.selectedProvince.key === 'all') {

        this.filteredBoards = this.boards;

        return;

      }

      this.filteredBoards = [];

      for (const board of this.boards) {

        if (board && board.province === this.selectedProvince.key) {

          this.filteredBoards.push(board);

        }

      }

    }

  }

  filterResults() {

    this.isLoading = true;

    this.selectedPageNo = 1;

    if (this.results) {

      this.filteredResults = [];

      for (const res of this.results) {

        if (res && res.board && (res.board.province === this.selectedProvince.key || this.selectedProvince.key === 'all')
          && (res.board.key === this.selectedBoardKey || this.selectedBoardKey === 'default')
          && res.section && (res.section.title === this.selectedClass || this.selectedClass === 'default')
          && res.status === this.selectedStatus) {

          this.filteredResults.push(res);

        }

      }

      this.isLoading = false;

    }

  }

  filterByClass(event) {

    if (event) {

      this.selectedClass = event.target.value;

      this.filterResults();

    }

  }

  filterByBoard(event) {

    if (event) {

      this.selectedBoardKey = event.target.value;

      this.filterResults();

    }

  }

  onPageChange(event) {

    this.config.currentPage = event;

  }

  retry() {

    this.getLatestResults();

  }

  setDefaultFilters() {

    this.selectedProvince = this.provinces[0];

    this.selectedBoardKey = 'default';

    this.selectedClass = 'default';

    this.selectedStatus = true;

    this.filterResults();

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

    if (result && result.board) {

      let examType = 'annual';

      if (result.examType === Enums.EXAM_TYPE.ANNUAL) {

        examType = 'annual';

      } else if (result.examType === Enums.EXAM_TYPE.SUPPLY) {

        examType = 'supply';

      } else if (result.examType === Enums.EXAM_TYPE.TEST) {

        examType = 'test';

      }

      // tslint:disable-next-line:max-line-length
      window.location.href = `${window.location.protocol}//${result.board.domain}.${ENV.host}/result/${result.section.title}/${examType}/${result.year}`;

    }

  }

  onNavItemSelection = (navItem) => {

    this.selectedNavItem = navItem;

  }

  ngOnDestroy() {

    this.alive = false;

  }

}
