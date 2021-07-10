import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as Enums from '@app/app.enums';
import {PaginationInstance} from 'ngx-pagination';
import {AnimationOptions} from 'ngx-lottie';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {BoardService, ClassService, DateSheetService} from '@app/services';
import {environment as ENV} from '@env/environment';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-date-sheets',
  templateUrl: './date-sheets.component.html',
  styleUrls: ['./date-sheets.component.scss']
})
export class DateSheetsComponent implements OnInit, OnDestroy {

  pages: any;
  result: any;
  boards = [];
  alive = true;
  classes = [];
  dateSheets = [];
  errorMsg = '';
  boardData: any;
  isError = false;
  isLoading = true;
  allEnums = Enums;
  itemsPerPage = 12;
  boardDomain: string;
  totalDateSheets = 0;
  selectedPageNo = 1;
  filteredBoards = [];
  filteredDateSheets = [];
  selectedStatus = true;
  selectedClass = 'default';
  selectedBoardKey = 'default';

  @Input() showFilters = true;
  @Input() showBadgeLinks = true;
  @Input() showPagination = false;

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

  config: PaginationInstance = {
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: this.totalDateSheets
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
              private dateSheetService: DateSheetService) { }

  ngOnInit() {

    this.boardDomain = window.location.hostname && window.location.hostname.substring(0, window.location.hostname.indexOf('.'));

    this.title.setTitle(ENV.pageTitle);

    if (this.showFilters && !this.boardDomain) {

      this.getClasses();

      this.getAllBoards();

    }

    this.getLatestDateSheets();

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

  getLatestDateSheets() {

    this.isLoading = true;

    const dateSheetsHttp = this.boardDomain
      ? this.dateSheetService.getDateSheetsByBoardDomain(this.boardDomain) : this.dateSheetService.getLatestDateSheets();

    dateSheetsHttp.pipe(takeWhile(this.isAlive))
      .subscribe(
        response => {

          if (response && response.data) {

            this.dateSheets = response.data.dateSheets ? response.data.dateSheets : response.data;

            this.boardData = response.data.board;

            if (this.dateSheets) {

              this.dateSheets.forEach(dateSheet => {

                dateSheet.parsedExamType = this.extractExamType(dateSheet.examType);

              });

              this.filteredDateSheets = this.dateSheets;

              this.selectedProvince = this.provinces[0];

              this.totalDateSheets = this.dateSheets && this.dateSheets.length;

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

    if (Array.isArray(this.dateSheets)) {

      const keyWords = [];

      this.meta.addTag({ property: 'article:tag', content: 'result'});

      this.meta.addTag({ property: 'article:tag', content: 'resultsquare'});

      this.meta.addTag({ property: 'article:tag', content: 'resultsquare.pk'});

      this.meta.addTag({ property: 'article:tag', content: 'result square pk'});

      this.dateSheets.forEach(result => {

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

      this.filterDateSheets();

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

  filterDateSheets() {

    this.isLoading = true;

    this.selectedPageNo = 1;

    if (this.dateSheets) {

      this.filteredDateSheets = [];

      for (const res of this.dateSheets) {

        if (res && res.board && (res.board.province === this.selectedProvince.key || this.selectedProvince.key === 'all')
          && (res.board.key === this.selectedBoardKey || this.selectedBoardKey === 'default')
          && res.sections && ((res.sections.find(section => section.title === this.selectedClass) || this.selectedClass === 'default'))) {

          this.filteredDateSheets.push(res);

        }

      }

      this.isLoading = false;

    }

  }

  filterByClass(event) {

    if (event) {

      this.selectedClass = event.target.value;

      this.filterDateSheets();

    }

  }

  filterByBoard(event) {

    if (event) {

      this.selectedBoardKey = event.target.value;

      this.filterDateSheets();

    }

  }

  onPageChange(event) {

    this.config.currentPage = event;

  }

  retry() {

    this.getLatestDateSheets();

  }

  setDefaultFilters() {

    this.selectedProvince = this.provinces[0];

    this.selectedBoardKey = 'default';

    this.selectedClass = 'default';

    this.selectedStatus = true;

    this.filterDateSheets();

  }

  extractExamType(exam) {

    if (exam === Enums.EXAM_TYPE.ANNUAL) {

      return 'Annual';

    } else if (exam === Enums.EXAM_TYPE.SUPPLY) {

      return 'Supply';

    } else if (exam === Enums.EXAM_TYPE.TEST) {

      return 'Test';

    }

  }

  viewDateSheet(dateSheet) {

    // tslint:disable-next-line:max-line-length
    window.location.href = `${window.location.protocol}//${dateSheet.board.domain}.${ENV.host}/date-sheets/${dateSheet.pageId}`;

  }

  loadMore = () => {

    this.itemsPerPage = this.itemsPerPage + 4;

  }

  ngOnDestroy() {

    this.alive = false;

  }

}
