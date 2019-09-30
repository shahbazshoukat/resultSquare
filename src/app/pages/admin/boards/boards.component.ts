import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {


  boards = [];

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.boardService.getAllBoardes().subscribe(response => {
      if(response.data){
        this.boards = response.data;
      }
    })
  }

}
