import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationInstance} from 'ngx-pagination';
import {AnimationOptions} from 'ngx-lottie';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {BoardService, ClassService, ResultService} from '@app/services';
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
  totalResults = 0;
  selectedPageNo = 1;
  filteredBoards = [];
  filteredResults = [];
  selectedStatus = true;
  selectedBoard: string;
  selectedProvince = 'All';
  selectedClass = 'default';
  selectedBoardKey = 'default';

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

    this.route.params.pipe(takeWhile(this.isAlive)).subscribe(params => {

      if (params) {

        this.selectedBoardKey = params.boardKey;

        this.selectedBoard = this.selectedBoardKey && this.selectedBoardKey.replace(/-/g, ' ');

        this.getResultsByBoardKey();

      }

    });

  }

  ngOnInit() {

    this.title.setTitle(ENV.pageTitle);

  }

  isAlive = () => {

    return this.alive;

  }

  getResultsByBoardKey() {

    this.isLoading = true;

    this.resultService.getResultsByBoardKey(this.selectedBoardKey).pipe(takeWhile(this.isAlive))
      .subscribe(
        response => {

          if (response && response.data) {

            this.results = response.data.results;

            this.boardData = response.data.board;

            if (this.results) {

              this.filteredResults = this.results;

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

  /*filterByStatus(status) {

    this.selectedStatus = status;

    this.selectedProvince = 'All';

    this.selectedBoardKey = 'default';

    this.selectedClass = 'default';

    if (this.results) {

      this.filteredResults = [];

      for (const res of this.results) {

        if (res && res.status === this.selectedStatus) {

          this.filteredResults.push(res);

        }

      }

    }

  }*/

  filterByProvince(province) {

    if (province) {

      this.selectedProvince = province;

      this.selectedBoardKey = 'default';

      this.selectedClass = 'default';

      this.filterResults();

      if (province === 'All') {

        this.filteredBoards = this.boards;

        return;

      }

      this.filteredBoards = [];

      for (const board of this.boards) {

        if (board && board.province === province) {

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

        if (res && res.board && (res.board.province === this.selectedProvince || this.selectedProvince === 'All')
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

    this.getResultsByBoardKey();

  }

  setDefaultFilters() {

    this.selectedProvince = 'All';

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

  ngOnDestroy() {

    this.alive = false;

  }

}
