import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BoardService } from '@app/services';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit, OnDestroy {

  routeSubscription$: any;
  selectedProvince: string;
  selectedSection: string;
  getBoardsSubscription$: any;
  boards = [];
  isLoading = false;
  isError = false;
  errorMsg = '';
  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json'
  };

  loadingAnim: AnimationItem;
  errorAnimOptions: AnimationOptions = {
    path: '/assets/lib/error.json'
  };

  errorAnim: AnimationItem;

  constructor(private router: Router, private route: ActivatedRoute, private boardService: BoardService) { }

  ngOnInit() {

    this.routeSubscription$ = this.route.paramMap.subscribe((paramMap: ParamMap) => {

      this.isError = false;

      this.errorMsg = '';

      if (paramMap.has('province')) {

        this.selectedProvince = paramMap.get('province');

        this.getBoardsByProvince();

      } else if (paramMap.has('class')) {

        this.selectedSection = paramMap.get('class');

        this.getBoardsBySectionTitle();

      }

    });

  }

  loadingAnimationCreated(animationItem: AnimationItem): void {

    this.loadingAnim = animationItem;

  }

  errorAnimationCreated(animationItem: AnimationItem): void {

    this.errorAnim = animationItem;

  }

  getBoardsByProvince() {

    this.isError = false;

    this.errorMsg = '';

    this.isLoading = true;

    if (this.selectedProvince) {

      this.getBoardsSubscription$ = this.boardService.getBoardsByProvince(this.selectedProvince)
        .subscribe(
          response => {

            if (response && response.data) {

              this.boards = response.data;

              if (!this.boards || this.boards.length === 0) {

                this.isError = true;

                this.errorMsg = '404 - Not Found';

              }

            }

            this.isLoading = false;

          },
          error => {

            if (error && error.error && error.error.message) {

              this.isError = true;

              this.errorMsg = 'Something Went Wrong';

            }

            this.isLoading = false;

          });

    }

  }

  getBoardsBySectionTitle() {

    this.isError = false;

    this.errorMsg = '';

    this.isLoading = true;

    if (this.selectedSection) {

      console.log()

      this.getBoardsSubscription$ = this.boardService.getBoardsBySectionTitle(this.selectedSection)
        .subscribe(
          response => {

            if (response && response.data) {

              this.boards = response.data;

              if (!this.boards || this.boards.length === 0) {

                this.isError = true;

                this.errorMsg = '404 - Not Found';

              }

            }

            this.isLoading = false;

          },
          error => {

            if (error && error.error && error.error.message) {

              this.isError = true;

              this.errorMsg = 'Something Went Wrong';

            }

            this.isLoading = false;

          });

    }

  }

  retry() {

    if (this.selectedProvince) {

      this.getBoardsByProvince();

    } else if (this.selectedSection) {

      this.getBoardsBySectionTitle();

    }

  }

  ngOnDestroy () {

    this.routeSubscription$ && this.routeSubscription$.unsubscribe();
    this.getBoardsSubscription$ && this.getBoardsSubscription$.unsubscribe();

  }

}
