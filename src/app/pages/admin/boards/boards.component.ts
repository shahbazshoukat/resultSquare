import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { Router, NavigationExtras } from '@angular/router';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit, OnDestroy {


  isLoading = true;
  boards = [];
  boardSub: any;
  removeBoardSub: any;
  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json'
  };

  loadingAnim: AnimationItem;

  constructor(private boardService: BoardService, private router: Router, private alertService: AlertService ) { }

  ngOnInit() {
    this.isLoading = true;
    this.boardSub = this.boardService.getAllBoardes().subscribe(
      response => {
      if (response.success && response.data) {
        this.boards = response.data;
        this.isLoading = false;
      }
    },
    error => {
      this.isLoading = false;
      if (error && error.error && error.error.message) {
        this.alertService.danger(error.error.message);
      }
    });
  }

  loadingAnimationCreated(animationItem: AnimationItem): void {

    this.loadingAnim = animationItem;

  }

  removeBoard(boardId) {
    this.isLoading = true;
    this.removeBoardSub = this.boardService.deleteBoard(boardId).subscribe(
      response => {
      if (response.success && response.message && response.data) {
       this.boards.forEach((board, index) => {
         if (board._id === boardId) {
            this.boards.splice(index, 1);
         }
       });
       this.isLoading = false;
       this.alertService.success(response.message);
      }
    },
    error => {
      this.isLoading = false;
      if (error && error.error && error.error.message) {
        this.alertService.danger(error.error.message);
      }
    });
  }

  editBoard(boardId: any) {
    this.router.navigate(['/rs-admin/add-board', {boardId: boardId}]);
  }

  ngOnDestroy() {

    this.boardSub && this.boardSub.unsubscribe();
    this.removeBoardSub && this.removeBoardSub.unsubscribe();

  }

}
