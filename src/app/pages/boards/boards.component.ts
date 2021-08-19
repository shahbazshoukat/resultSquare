import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { environment as ENV } from '@env/environment';
import { AnimationOptions } from 'ngx-lottie';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService, ClassService } from '@app/services';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit, OnDestroy {

  boards = [];
  alive = true;
  errorMsg = '';
  isError = false;
  isLoading = true;
  filteredBoards = [];

  @Input() showFilters = true;

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
              private boardService: BoardService) {

  }

  ngOnInit() {

    this.title.setTitle(ENV.pageTitle);

    this.getAllBoards();

  }

  isAlive = () => {

    return this.alive;

  }

  getAllBoards() {

    this.isLoading = true;

    this.boards = [];

    this.boardService.getAllBoards().pipe(takeWhile(this.isAlive))
      .subscribe(
        response => {

          if (response && response.data) {

            this.boards = response.data;

            if (this.boards) {

              this.filteredBoards = this.boards;

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

    if (Array.isArray(this.boards)) {

      const keyWords = [];

      this.meta.addTag({ property: 'article:tag', content: 'result'});

      this.meta.addTag({ property: 'article:tag', content: 'resultsquare'});

      this.meta.addTag({ property: 'article:tag', content: 'resultsquare.pk'});

      this.meta.addTag({ property: 'article:tag', content: 'result square pk'});

      this.boards.forEach(board => {

        if (board && board.title) {

          keyWords.push(board.title);

          this.meta.addTag({ property: 'article:tag', content: board.title });

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

  retry() {

    this.getAllBoards();

  }

  filterByProvince(province) {

    this.selectedProvince = province;

    if (this.selectedProvince) {

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

  ngOnDestroy() {

    this.alive = false;

  }

}
