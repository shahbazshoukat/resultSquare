import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {takeWhile} from 'rxjs/operators';
import * as Enums from '@app/app.enums';
import {environment as ENV} from '@env/environment';
import {AnimationOptions} from 'ngx-lottie';
import {BoardService, ClassService, DateSheetService, ModelPaperService, NewsService, ResultService} from '@app/services';
import {ActivatedRoute, Router} from '@angular/router';

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
  boardDomain: string;
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

  @Input() panelMode = Enums.FILTER_PANEL_MODE.RESULTS;
  @ViewChild('findBtn', { static: false }) findBtn: ElementRef;

  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json',
    loop: true,
    autoplay: true
  };

  constructor(private classService: ClassService,
              private boardService: BoardService,
              private resultService: ResultService,
              private dateSheetService: DateSheetService,
              private modelPaperService: ModelPaperService, ) { }

  ngOnInit() {

    console.log(this.subjects);

    this.boardDomain = window.location.hostname && window.location.hostname.substring(0, window.location.hostname.indexOf('.'));

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

      if (this.panelMode === this.filterPanelModes.RESULTS || this.panelMode === this.filterPanelModes.DATE_SHEETS) {

        this.getResultYears();

      } else if (this.panelMode === this.filterPanelModes.MODEL_PAPERS) {

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

      if (this.panelMode === this.filterPanelModes.RESULTS) {

        resultYearsHttp = this.resultService.getResultYears(this.selectedClass, this.selectedBoard);

      } else if (this.panelMode === this.filterPanelModes.DATE_SHEETS) {

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

      if (this.panelMode === this.filterPanelModes.RESULTS) {

        examTypesHttp = this.resultService.getExamTypes(this.selectedClass, this.selectedBoard, this.selectedYear);

      } else if (this.panelMode === this.filterPanelModes.DATE_SHEETS) {

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

      const url = `results/${selClass.title}/${this.selectedExamType}/${this.selectedYear}`;

      window.location.href = `${window.location.protocol}//${selBoard.domain}.${ENV.host}/${url}`;

    }

  }

  findDateSheet = () => {

    const selectedBoard = this.boards.find(b => b._id === this.selectedBoard);

    const selectedClass = this.classes.find(c => c._id === this.selectedClass);

    if (selectedClass && selectedClass.title && selectedBoard && selectedBoard.domain && this.selectedYear && this.selectedExamType
      && this.selectedClass !== 'default' && this.selectedBoard !== 'default' && this.selectedYear !== 'default'
      && this.selectedExamType !== 'default') {

      const payload = {
        year: this.selectedYear,
        domain: selectedBoard.domain,
        section: selectedClass.title,
        examType: this.selectedExamType
      };

      this.isLoading = true;

      this.dateSheetService.getDateSheet(payload)
        .pipe(takeWhile(this.isAlive))
        .subscribe(response => {

          if (response && response.success && response.data && response.data.pageId) {

            window.location.href = `${window.location.protocol}//${selectedBoard.domain}.${ENV.host}/date-sheets/${response.data.pageId}`;

          }

          this.isLoading = false;

        }, error => {

          this.isError = true;

          this.isLoading = false;

          this.errorMsg = error && error.error && error.error.message;

        });

    }

  }

  findModelPaper() {

    const selectedBoard = this.boards.find(b => b._id === this.selectedBoard);

    const selectedClass = this.classes.find(c => c._id === this.selectedClass);

    if (selectedClass && selectedClass.title && selectedBoard && selectedBoard.domain && this.selectedSubject
      && this.selectedClass !== 'default' && this.selectedBoard !== 'default' && this.selectedSubject !== 'default') {

      const url = `model-papers/${selectedClass.title}/${this.selectedSubject}`;

      window.location.href = `${window.location.protocol}//${selectedBoard.domain}.${ENV.host}/${url}`;

    }

  }

  ngOnDestroy() {

    this.alive = false;

  }

}
