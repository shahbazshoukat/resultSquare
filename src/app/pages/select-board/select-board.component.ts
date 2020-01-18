import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BoardService } from 'src/app/services/board.service';
import { Board } from 'src/app/models/board.model';
import { ClassService } from 'src/app/services/class.service';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';
import * as Enums from '../../app.enums';

@Component({
  selector: 'app-select-board',
  templateUrl: './select-board.component.html',
  styleUrls: ['./select-board.component.scss']
})
export class SelectBoardComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private boardService: BoardService, private classService: ClassService) { }
  boards: Board[] = [];
  punjabBoards = [];
  kpkBoards = [];
  sindhBoards = [];
  balochBoards = [];
  ajkBoards = [];
  federalBoards = [];
  selectedClass;
  isLoading = true;
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

  ngOnInit() {

    this.paramSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {

      this.isLoading = true;

      if (paramMap.has('classTitle')) {

        this.selectedClass = paramMap.get('classTitle');

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

  getBoardsBySectionTitle() {

    if (this.selectedClass) {

      this.isError = false;

      this.errorMsg = '';

      this.serviceSub = this.boardService.getBoardBySectionTitle(this.selectedClass).subscribe(
        response => {

          this.boards = response.data;

          if (!this.boards || this.boards.length === 0) {

            this.isError = true;

            this.errorMsg = `No Board Found with class ${this.selectedClass}`;

          } else {

            this.sortBoardsByProvince();

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

  sortBoardsByProvince() {

    this.boards.forEach(board => {

      if (board && board.province) {

        if (board.province === Enums.PROVINCE.PUNJAB) {

          this.punjabBoards.push(board);

        } else if (board.province === Enums.PROVINCE.KPK) {

          this.kpkBoards.push(board);

        } else if (board.province === Enums.PROVINCE.SINDH) {

          this.sindhBoards.push(board);

        } else if (board.province === Enums.PROVINCE.BALOCHISTAN) {

          this.balochBoards.push(board);

        } else if (board.province === Enums.PROVINCE.AJK) {

          this.ajkBoards.push(board);

        } else if (board.province === Enums.PROVINCE.FEDERAL) {

          this.federalBoards.push(board);

        }

      }

    });

  }

  backToHome() {

    this.router.navigate(['']);

  }

  ngOnDestroy() {

    this.paramSub && this.paramSub.unsubscribe();

    this.serviceSub && this.serviceSub.unsubscribe();

  }

}
