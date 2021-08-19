import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import * as Enums from '@app/app.enums';
import { AnimationOptions } from 'ngx-lottie';
import { BoardService, ClassService, DateSheetService, ModelPaperService, ResultService } from '@app/services';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit, OnDestroy {

  years = [];
  boards = [];
  classes = [];
  alive = true;
  errorMsg = '';
  examTypes = [];
  isError = false;
  isLoading = false;
  yearSelected = false;
  classSelected = false;
  boardSelected = false;
  subjectSelected = false;
  examTypeSelected = false;
  selectedYear = 'default';
  selectedClass = 'default';
  selectedBoard = 'default';
  subjects = Enums.SUBJECTS;
  selectedSubject = 'default';
  selectedExamType = 'default';
  filterPanelModes = Enums.FILTER_PANEL_MODE;

  @ViewChild('findBtn', { static: false }) findBtn: ElementRef;

  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json',
    loop: true,
    autoplay: true
  };

  panelStates = [
    {
      label: 'Results',
      routeKey: 'results',
      key: Enums.FILTER_PANEL_MODE.RESULTS,
      iconPath: '../../../assets/img/icons/result3.svg'
    },
    {
      label: 'Date Sheets',
      routeKey: 'date-sheets',
      key: Enums.FILTER_PANEL_MODE.DATE_SHEETS,
      iconPath: '../../../assets/img/icons/result4.svg'
    },
    {
      label: 'Model Papers',
      routeKey: 'model-papers',
      key: Enums.FILTER_PANEL_MODE.MODEL_PAPERS,
      iconPath: '../../../assets/img/icons/datesheet.svg'
    }
  ];
  @Input() panelMode = this.panelStates[0];

  constructor(private router: Router,
              private classService: ClassService,
              private boardService: BoardService,
              private resultService: ResultService,
              private dateSheetService: DateSheetService) {

    this.router.events.pipe(takeWhile(this.isAlive)).subscribe(event => {

      if (event instanceof NavigationEnd) {

        const url = event.url.split('/');

        if (url && url[1]) {

          this.panelMode = this.panelStates.find(panelState => panelState && panelState.routeKey === url[1]);

        } else {

          this.panelMode = this.panelStates[0];

        }

      }

    });

  }

  ngOnInit() {

    this.getClasses();

  }

  isAlive = () => {

    return this.alive;

  }

  getClasses() {

    this.isLoading = true;

    this.isError = false;

    this.errorMsg = '';

    this.selectedClass = 'default';

    this.classService.getAllClasses().pipe(takeWhile(this.isAlive)).subscribe(
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

      this.boardService.getBoardsBySectionId(this.selectedClass).pipe(takeWhile(this.isAlive)).subscribe(
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

      if (this.panelMode.key === this.filterPanelModes.RESULTS || this.panelMode.key === this.filterPanelModes.DATE_SHEETS) {

        this.getResultYears();

      } else if (this.panelMode.key === this.filterPanelModes.MODEL_PAPERS) {

        this.boardSelected = true;

      }

    }

  }

  getResultYears() {

    if (this.selectedClass && this.selectedBoard) {

      this.isLoading = true;

      this.isError = false;

      this.errorMsg = '';

      let resultYearsHttp = null;

      if (this.panelMode.key === this.filterPanelModes.RESULTS) {

        resultYearsHttp = this.resultService.getResultYears(this.selectedClass, this.selectedBoard);

      } else if (this.panelMode.key === this.filterPanelModes.DATE_SHEETS) {

        resultYearsHttp = this.dateSheetService.getDateSheetYears(this.selectedClass, this.selectedBoard);

      } else {

        return;

      }

      resultYearsHttp.pipe(takeWhile(this.isAlive)).subscribe(
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

      let examTypesHttp = null;

      if (this.panelMode.key === this.filterPanelModes.RESULTS) {

        examTypesHttp = this.resultService.getExamTypes(this.selectedClass, this.selectedBoard, this.selectedYear);

      } else if (this.panelMode.key === this.filterPanelModes.DATE_SHEETS) {

        examTypesHttp = this.dateSheetService.getExamTypes(this.selectedClass, this.selectedBoard, this.selectedYear);

      } else {

        return;

      }

      examTypesHttp.pipe(takeWhile(this.isAlive)).subscribe(
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

    if (event && event.target && event.target.value) {

      this.selectedExamType = event.target.value;

      this.examTypeSelected = true;

    }

  }

  onSubjectSelected = (event) => {

    if (event && event.target && event.target.value) {

      this.selectedSubject = event.target.value;

      this.subjectSelected = true;

    }

  }

  findResult() {

    const selBoard = this.boards.find(b => b._id === this.selectedBoard);

    const selClass = this.classes.find(c => c._id === this.selectedClass);

    if (selClass && selClass.title && selBoard && selBoard.domain && this.selectedYear && this.selectedExamType
      && this.selectedClass !== 'default' && this.selectedBoard !== 'default' && this.selectedYear !== 'default'
      && this.selectedExamType !== 'default') {

      this.router.navigate(['/results/', selBoard.domain, selClass.title, this.selectedExamType, this.selectedYear]);

    }

  }

  findDateSheet = () => {

    const selBoard = this.boards.find(b => b._id === this.selectedBoard);

    const selClass = this.classes.find(c => c._id === this.selectedClass);

    if (selClass && selClass.title && selBoard && selBoard.domain && this.selectedYear && this.selectedExamType
      && this.selectedClass !== 'default' && this.selectedBoard !== 'default' && this.selectedYear !== 'default'
      && this.selectedExamType !== 'default') {

      this.router.navigate(['/date-sheets/', selBoard.domain, selClass.title, this.selectedExamType, this.selectedYear]);

    }

  }

  findModelPaper() {

    const selectedBoard = this.boards.find(b => b._id === this.selectedBoard);

    const selectedClass = this.classes.find(c => c._id === this.selectedClass);

    if (selectedClass && selectedClass.title && selectedBoard && selectedBoard.domain && this.selectedSubject
      && this.selectedClass !== 'default' && this.selectedBoard !== 'default' && this.selectedSubject !== 'default') {

      this.router.navigate(['/model-papers/', selectedBoard.domain, selectedClass.title, this.selectedSubject]);

    }

  }

  updatePanelState = (state) => {

    this.panelMode = state;

    this.resetFilters();

  }

  resetFilters = () => {

    this.selectedSubject = 'default';

    this.selectedYear = 'default';

    this.selectedBoard = 'default';

    this.selectedExamType = 'default';

    this.selectedClass = 'default';

    this.classSelected = false;

    this.boardSelected = false;

    this.examTypeSelected = false;

    this.yearSelected = false;

    this.subjectSelected = false;

  }

  ngOnDestroy() {

    this.alive = false;

  }

}
