import { Component, OnInit } from '@angular/core';
import {BoardService, ClassService} from '@app/services';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  classes = [];
  boards = [];
  classSubscription$: any;
  boardSubscription$: any;

  constructor(private classService: ClassService, private boardService: BoardService) { }

  ngOnInit() {

    this.getAllClasses();

    this.getAllBoards();

  }

  getAllClasses() {

    this.classSubscription$ = this.classService.getAllClasses()
      .subscribe(
        response => {

          if (response && response.data) {

            this.classes = response.data;

            if (this.classes) {

              this.classService.setClassesUpdateListener(this.classes);

            }

          }

        });

  }

  getAllBoards() {

    this.boardSubscription$ = this.boardService.getAllBoardes()
      .subscribe(
        response => {

          if (response && response.data) {

            this.boards = response.data;

            if (this.boards) {

              this.boardService.setBoardsUpdateListener(this.boards);

            }

          }

        }
      );

  }

}
