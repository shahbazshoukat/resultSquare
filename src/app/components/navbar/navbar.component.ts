import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {ClassService} from '@app/services/class.service';
import {BoardService} from '@app/services/board.service';
import * as Enums from '@app/app.enums';
import {ResultService} from '@app/services/result.service';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoading = false;
  isError = false;
  errorMsg = '';
  selectedClass = 'default';
  classSelected = false;
  selectedBoard: any;
  selectedBoardKey = 'default';
  boardSelected = false;
  selectedYear = 'default';
  yearSelected = false;
  selectedExamType = 'default';
  examTypeSelected = false;
  classes = [];
  boards = [];
  years = [];
  examTypes = [];
  getClassesSubscription$: any;
  getBoardsSubscription$: any;
  getResultYearsSubscription$: any;
  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/green-spinner.json'
  };

  loadingAnim: AnimationItem;

  constructor(private classService: ClassService,
              private boardService: BoardService,
              private resultService: ResultService,
              private router: Router) {}

  ngOnInit() {

    this.getClasses();

  }

  loadingAnimationCreated(animationItem: AnimationItem): void {

    this.loadingAnim = animationItem;

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
          this.isLoading = false;
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

  onClassSelected(event) {

    if (event) {

      this.classSelected = false;

      this.selectedClass = event.target.value;

      this.selectedBoardKey = 'default';

      this.getBoardsBySectionTitle();

    }

  }

  getBoardsBySectionTitle() {

    this.boards = [];

    if (this.selectedClass) {

      this.isError = false;

      this.errorMsg = '';

      this.getBoardsSubscription$ = this.boardService.getBoardBySectionTitle(this.selectedClass).subscribe(
        response => {

          this.boards = response.data;

          if (!this.boards || this.boards.length === 0) {

            this.isError = true;

            this.errorMsg = `404 - Not Found`;

          }

          this.isLoading = false;

          this.classSelected = true;

          this.boardSelected = false;

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

  onBoardSelected(event) {

    if (event) {

      this.boardSelected = false;

      this.selectedBoardKey = event.target.value;

      this.selectedYear = 'default';

      this.getResultYears();

    }

  }

  getResultYears() {

    if (this.selectedClass && this.selectedBoardKey) {

      this.isLoading = true;

      this.isError = false;

      this.errorMsg = '';

      this.getResultYearsSubscription$ = this.resultService.getResultYears(this.selectedClass, this.selectedBoardKey).subscribe(
        response => {

          if (response && response.data) {

            this.years = response.data;

            if (!this.years || this.years.length === 0) {

              this.isError = true;

              this.errorMsg = `No Year Found`;

            }

          }

          this.isLoading = false;

          this.boardSelected = true;

          this.yearSelected = false;

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

  onYearSelected(event) {

    if (event) {

      this.selectedYear = event.target.value;

      this.yearSelected = false;

      this.selectedExamType = 'default';

      this.getExamTypes();

    }

  }

  getExamTypes() {

    this.yearSelected = true;

    this.examTypeSelected = false;

  }

  onExamTypeSelected(event) {

    if (event) {

      this.selectedExamType = event.target.value;

      this.examTypeSelected = true;

    }

  }

  findResult() {

    if (this.selectedClass && this.selectedBoardKey && this.selectedYear && this.selectedExamType
         && this.selectedClass !== 'default' && this.selectedBoardKey !== 'default' && this.selectedYear !== 'default'
         && this.selectedExamType !== 'default') {

     const url = `/result/${this.selectedClass}/${this.selectedBoardKey}/${this.selectedYear}/${this.selectedExamType}`;

     this.router.navigate([url]);

    }

  }

}
