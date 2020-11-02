import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService, NewsService} from '@app/services';
import { BoardService } from '@app/services';
import * as Enums from '@app/app.enums';
import { ResultService } from '@app/services';
import { AnimationOptions } from 'ngx-lottie';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {

  news = [];
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
  examTypeSelected = false;
  selectedYear = 'default';
  selectedClass = 'default';
  selectedBoard = 'default';
  selectedExamType = 'default';
  @ViewChild('findBtn', { static: false }) findBtn: ElementRef;

  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json',
    loop: true,
    autoplay: true
  };

  constructor(private newsService: NewsService,
              private classService: ClassService,
              private boardService: BoardService,
              private resultService: ResultService,
              private router: Router) {}

  ngOnInit() {

    this.getNews();

    this.getClasses();

  }

  isAlive = () => {

    return this.alive;

  }

  getNews() {

    this.newsService.getAllNews().pipe(takeWhile(this.isAlive)).subscribe(
      response => {

        if (response.success && response.data) {

          this.news = response.data;

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

      this.getResultYears();

    }

  }

  getResultYears() {

    if (this.selectedClass && this.selectedBoard) {

      this.isLoading = true;

      this.isError = false;

      this.errorMsg = '';

      this.resultService.getResultYears(this.selectedClass, this.selectedBoard).pipe(takeWhile(this.isAlive)).subscribe(
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

      this.resultService.getExamTypes(this.selectedClass, this.selectedBoard, this.selectedYear)
        .pipe(takeWhile(this.isAlive)).subscribe(
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

    this.alive = false;

  }

}
