import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import { BoardService } from 'src/app/services/board.service';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';

@Component({
  selector: 'app-select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['./select-year.component.scss']
})
export class SelectYearComponent implements OnInit, OnDestroy {

  selectedBoardKey = '';
  selectedBoard = '';
  selectedClass = '';
  years;
  isLoading = false;
  isError = false;
  errorMsg = '';
  paramSub: any;
  serviceSub: any;
  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json'
  };

  loadingAnim: AnimationItem;
  errorAnimOptions: AnimationOptions = {
    path: '/assets/lib/error.json'
  };

  errorAnim: AnimationItem;

  constructor(private router: Router, private resultService: ResultService, private boardService: BoardService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.paramSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has('boardKey')) {

        this.selectedBoardKey = paramMap.get('boardKey');

        this.selectedBoard = this.selectedBoardKey.replace(/-/g, ' ');

      }

      if (paramMap.has('classTitle')) {

        this.selectedClass = paramMap.get('classTitle');

        this.getResultYears();

      }

    });

  }

  loadingAnimationCreated(animationItem: AnimationItem): void {

    this.loadingAnim = animationItem;

  }

  errorAnimationCreated(animationItem: AnimationItem): void {

    this.errorAnim = animationItem;

  }

  getResultYears() {

    if (this.selectedClass && this.selectedBoardKey) {

      this.isLoading = true;

      this.isError = false;

      this.errorMsg = '';

      this.serviceSub = this.resultService.getResultYears(this.selectedClass, this.selectedBoardKey).subscribe(
        response => {

          this.years = response.data;

          if (!this.years || this.years.length === 0) {

            this.isError = true;

            this.errorMsg = `No Year Found`;

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

  }

  backToHome() {

    this.router.navigate(['']);

  }

  ngOnDestroy() {

    this.paramSub && this.paramSub.unsubscribe();

    this.serviceSub && this.serviceSub.unsubscribe();

  }

}
