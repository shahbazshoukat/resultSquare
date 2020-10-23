import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from '@app/services';
import { BoardService } from '@app/services';
import * as Enums from '@app/app.enums';
import { ResultService } from '@app/services';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  // @ts-ignore
  @ViewChild('findBtn') findBtn: ElementRef;

  isLoading = false;
  isError = false;
  errorMsg = '';
  selectedClass = 'default';
  classSelected = false;
  selectedBoard = 'default';
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
  getExamTypesSubscription$: any;
  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json'
  };

  loadingAnim: AnimationItem;
  examAnimOptions: AnimationOptions = {
    path: 'assets/lib/exam.json',
    loop: true,
    autoplay: true
  };

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

      this.selectedBoard = 'default';

      this.getBoardsBySectionId();

    }

  }

  getBoardsBySectionId() {

    this.boards = [];

    if (this.selectedClass) {

      this.isError = false;

      this.errorMsg = '';

      this.isLoading = true;

      this.getBoardsSubscription$ = this.boardService.getBoardsBySectionId(this.selectedClass).subscribe(
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

      this.selectedBoard = event.target.value;

      this.selectedYear = 'default';

      this.getResultYears();

    }

  }

  getResultYears() {

    if (this.selectedClass && this.selectedBoard) {

      this.isLoading = true;

      this.isError = false;

      this.errorMsg = '';

      this.getResultYearsSubscription$ = this.resultService.getResultYears(this.selectedClass, this.selectedBoard).subscribe(
        response => {

          if (response && response.data) {

            this.years = response.data;

            this.years.reverse();

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

    if (this.selectedClass && this.selectedBoard && this.selectedYear) {

      this.isLoading = true;

      this.isError = false;

      this.errorMsg = '';

      this.getExamTypesSubscription$ = this.resultService.getExamTypes(this.selectedClass, this.selectedBoard, this.selectedYear)
        .subscribe(
        response => {

          if (response && response.data) {

            const eTypes = response.data;

            this.examTypes = [];

            for (const et of eTypes) {

              let name = '';

              if (et === Enums.EXAM_TYPE.ANNUAL) {
                name = 'annual';
              } else if (et === Enums.EXAM_TYPE.SUPPLY) {
                name = 'supply';
              } else if (et === Enums.EXAM_TYPE.TEST) {
                name = 'test';
              }

              const ex = { title: name, value: et};

              this.examTypes.push(ex);

            }

            if (!this.examTypes || this.examTypes.length === 0) {

              this.isError = true;

              this.errorMsg = `No Exam Type Found`;

            }

          }

          this.isLoading = false;

          this.yearSelected = true;

          this.examTypeSelected = false;

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

  onExamTypeSelected(event) {

    if (event) {

      this.selectedExamType = event.target.value;

      this.examTypeSelected = true;

    }

  }

  findResult() {

    const selBoard = this.boards.find(b => b._id === this.selectedBoard);

    const selClass = this.classes.find(c => c._id === this.selectedClass);

    if (selClass && selClass.title && selBoard && selBoard.key && this.selectedYear && this.selectedExamType
         && this.selectedClass !== 'default' && this.selectedBoard !== 'default' && this.selectedYear !== 'default'
         && this.selectedExamType !== 'default') {

     const url = `/result/${selClass.title}/${selBoard.key}/${this.selectedYear}/${this.selectedExamType}`;

     this.router.navigate([url]);

    }

  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  ngOnDestroy() {

    this.getExamTypesSubscription$ && this.getExamTypesSubscription$.unsubscribe();
    this.getResultYearsSubscription$ && this.getResultYearsSubscription$.unsubscribe();
    this.getBoardsSubscription$ && this.getBoardsSubscription$.unsubscribe();
    this.getClassesSubscription$ && this.getClassesSubscription$.unsubscribe();

  }

}
