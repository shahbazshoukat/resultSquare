import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {


  boards = [];

  constructor(private boardService: BoardService, private router: Router ) { }

  ngOnInit() {
    this.boardService.getAllBoardes().subscribe(response => {
      if(response.success && response.data){
        this.boards = response.data;
      }
    })
  }

  removeBoard(boardId){
    this.boardService.deleteBoard(boardId).subscribe(response => {
      if(response.success && response.message && response.data) {
       this.boards.forEach((board, index) => {
         if(board._id === boardId) {
            this.boards.splice(index, 1);
         }
       })
        alert(response.message);
      }
    })
  }

  editBoard(boardId: any){
    this.router.navigate(["/rs-admin/add-board", {boardId: boardId}]);
  }

}
