import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment as ENV } from '@env/environment';
import { BoardService, ClassService } from '@app/services';
import * as Enums from '@app/app.enums';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  test: Date = new Date();
  classes = [];
  boards = [];
  punjabBoards = [];
  kpkBoards = [];
  sindhBoards = [];
  balochBoards = [];
  ajkBoards = [];
  classSubscription$: any;
  boardSubscription$: any;

  constructor(private classService: ClassService, private boardService: BoardService) { }

  ngOnInit() {

    this.getAllClasses();

    this.getAllBoards();

  }

  getAllClasses() {

    this.classSubscription$ = this.classService.getClassesUpdateListener()
      .subscribe(
        classes => {

          if (classes) {

            this.classes = classes;

          }

        });

  }

  getAllBoards() {

    this.boardSubscription$ = this.boardService.getBoardsUpdateListener()
      .subscribe(
        boards => {

          if (boards) {

            this.boards = boards;

            this.filterBoardsByProvince();

          }

        }
      );

  }

  filterBoardsByProvince () {

    if (this.boards) {

      this.punjabBoards = [];
      this.kpkBoards = [];
      this.sindhBoards = [];
      this.balochBoards = [];
      this.ajkBoards = [];

      this.boards.forEach(board => {

        if (board && board.province === Enums.PROVINCE.PUNJAB) {

          this.punjabBoards.push(board);

        } else if (board && board.province === Enums.PROVINCE.KPK) {

          this.kpkBoards.push(board);

        } else if (board && board.province === Enums.PROVINCE.SINDH) {

          this.sindhBoards.push(board);

        } else if (board && board.province === Enums.PROVINCE.BALOCHISTAN) {

          this.balochBoards.push(board);

        } else if (board && board.province === Enums.PROVINCE.AJK) {

          this.ajkBoards.push(board);

        }

      });

    }

  }

  openFbPage() {

    window.open(ENV.fbPageUrl, '_blank');

  }

  ngOnDestroy(): void {

    this.boardSubscription$ && this.boardSubscription$.unsubscribe();
    this.classSubscription$ && this.classSubscription$.unsubscribe();

  }

}
