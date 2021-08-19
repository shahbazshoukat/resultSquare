import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Enums from '@app/app.enums';
import { PaginationInstance } from 'ngx-pagination';
import { AnimationOptions } from 'ngx-lottie';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService, ClassService, ModelPaperService } from '@app/services';
import { environment as ENV } from '@env/environment';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-model-papers',
  templateUrl: './model-papers.component.html',
  styleUrls: ['./model-papers.component.scss']
})
export class ModelPapersComponent implements OnInit, OnDestroy {

  pages: any;
  boards = [];
  alive = true;
  classes = [];
  modelPapers = [];
  errorMsg = '';
  isError = false;
  isLoading = true;
  allEnums = Enums;
  itemsPerPage = 12;
  totalModelPapers = 0;
  selectedPageNo = 1;
  filteredBoards = [];
  filteredModelPapers = [];
  selectedStatus = true;
  selectedClass = 'default';
  selectedBoardKey = 'default';

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
    totalItems: this.totalModelPapers
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
              private modelPaperService: ModelPaperService) { }

  ngOnInit() {

    this.title.setTitle(ENV.pageTitle);

    this.getClasses();

    this.getAllBoards();

    this.getLatestModelPapers();

  }

  isAlive = () => {

    return this.alive;

  }

  getClasses() {

    this.classService.getAllClasses().pipe(takeWhile(this.isAlive))
      .subscribe(
        response => {

          if (response.success && response.data) {

            this.classes = response.data;

          }

        },
        error => {

        });

  }

  getAllBoards() {

    this.boardService.getAllBoards().pipe(takeWhile(this.isAlive)).subscribe(
      response => {

        this.boards = response.data;

        this.filteredBoards = this.boards;

      },

      error => {

      });

  }

  getLatestModelPapers() {

    this.isLoading = true;

    this.modelPaperService.getLatestModelPapers().pipe(takeWhile(this.isAlive))
      .subscribe(
        response => {

          if (response && response.data && Array.isArray(response.data)) {

            this.modelPapers = response.data;

            this.modelPapers.forEach(modelPaper => {

              modelPaper.parsedExamType = this.extractExamType(modelPaper.examType);

            });

            this.filteredModelPapers = this.modelPapers;

            this.selectedProvince = this.provinces[0];

            this.totalModelPapers = this.modelPapers && this.modelPapers.length;

          } else {

            this.isError = true;

            this.errorMsg = '404 - No Model Paper Found';

          }

          this.removeExistingTags();

          this.addMetaTags();

          this.isLoading = false;

        },
        error => {

          this.isLoading = false;

          this.isError = true;

          if (error && error.status && error.status === 404) {

            this.errorMsg = '404 - No Model Paper Found';

          } else {

            this.errorMsg = 'Something went wrong';

          }

        });

  }

  addMetaTags() {

    if (Array.isArray(this.modelPapers)) {

      const keyWords = [];

      this.meta.addTag({ property: 'article:tag', content: 'result'});

      this.meta.addTag({ property: 'article:tag', content: 'resultsquare'});

      this.meta.addTag({ property: 'article:tag', content: 'resultsquare.pk'});

      this.meta.addTag({ property: 'article:tag', content: 'result square pk'});

      this.modelPapers.forEach(result => {

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

      this.filterModelPapers();

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

  filterModelPapers() {

    this.isLoading = true;

    this.selectedPageNo = 1;

    if (this.modelPapers) {

      this.filteredModelPapers = [];

      for (const res of this.modelPapers) {

        if (res && res.board && (res.board.province === this.selectedProvince.key || this.selectedProvince.key === 'all')
          && (res.board.key === this.selectedBoardKey || this.selectedBoardKey === 'default')
          && res.section && (res.section === this.selectedClass || this.selectedClass === 'default')) {

          this.filteredModelPapers.push(res);

        }

      }

      this.isLoading = false;

    }

  }

  filterByClass(event) {

    if (event) {

      this.selectedClass = event.target.value;

      this.filterModelPapers();

    }

  }

  filterByBoard(event) {

    if (event) {

      this.selectedBoardKey = event.target.value;

      this.filterModelPapers();

    }

  }

  onPageChange(event) {

    this.config.currentPage = event;

  }

  retry() {

    this.getLatestModelPapers();

  }

  setDefaultFilters() {

    this.selectedProvince = this.provinces[0];

    this.selectedBoardKey = 'default';

    this.selectedClass = 'default';

    this.selectedStatus = true;

    this.filterModelPapers();

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

  viewModelPaper(modelPaper) {

    if (modelPaper && modelPaper.section && modelPaper.section.title && modelPaper.subject) {

      this.router.navigate(['/model-papers/', modelPaper.board.domain, modelPaper.section.title, modelPaper.subject]);

    }

  }

  loadMore = () => {

    this.itemsPerPage = this.itemsPerPage + 4;

  }

  ngOnDestroy() {

    this.alive = false;

  }

}
