import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import {ResultService} from '@app/services/result.service';
import {PaginationInstance} from 'ngx-pagination';
import {ClassService} from '@app/services/class.service';
import {BoardService} from '@app/services/board.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  classes = [];
  isLoading = true;
  isError = false;
  errorMsg = '';
  serviceSub: any;
  result: any;
  provinces = [
    'All',
    'Punjab',
    'KPK',
    'Sindh',
    'Balochistan',
    'AJK',
    'Federal'
  ];
  selectedProvince = 'All';
 status: {
   Announced: { value: true, selected: true},
   UnAnnounced: { value: false, selected: false}
 };
  showSearchResults = false;
  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json'
  };

  loadingAnim: AnimationItem;
  errorAnimOptions: AnimationOptions = {
    path: '/assets/lib/error.json'
  };

  errorAnim: AnimationItem;
  results = [];
  filteredResults = [];
  totalResults = 0;
  noOfPages = 0;
  pages;
  selectedPageNo = 1;
  resultsSubscription$: any;
  config: PaginationInstance = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: this.totalResults
  };
  selectedClass = 'default';
  getClassesSubscription$: any;
  boards = [];
  filteredBoards = [];
  selectedBoardKey = 'default';
  getBoardsSubscription$: any;
  selectedStatus = true;


  constructor(private router: Router, private resultService: ResultService,
              private classService: ClassService,
              private boardService: BoardService) { }

  ngOnInit() {

    this.getClasses();

    this.getAllBoards();

    this.getLatestResults();

  }

  loadingAnimationCreated(animationItem: AnimationItem): void {

    this.loadingAnim = animationItem;

  }

  errorAnimationCreated(animationItem: AnimationItem): void {

    this.errorAnim = animationItem;

  }

  getClasses() {

    this.isLoading = true;
    this.isError = false;
    this.errorMsg = '';
    this.selectedClass = 'default';
    this.getClassesSubscription$ = this.classService.getAllClasses().subscribe(
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

    this.getBoardsSubscription$ = this.boardService.getAllBoardes().subscribe(
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

    this.resultsSubscription$ = this.resultService.getLatestResults()
      .subscribe(
        response => {

          if (response && response.data) {

            this.results = response.data;

            this.filteredResults = this.results;

            this.selectedProvince = 'All';

            this.totalResults = this.results && this.results.length;

            this.filterByStatus(true);

          }

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

  filterByStatus(status) {

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

  }

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
    console.log(event);
    this.config.currentPage = event;
  }

  retry() {
    this.getLatestResults();
  }

  setDefaultFilters() {

    this.selectedProvince = 'All';

    this.selectedBoardKey = 'default';

    this.selectedClass = 'default';

    this.selectedStatus = true;

    this.filterByStatus(true);

  }

  ngOnDestroy() {

    this.serviceSub && this.serviceSub.unsubscribe();

  }

}
