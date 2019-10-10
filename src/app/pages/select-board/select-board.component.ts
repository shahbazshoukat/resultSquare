import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-select-board',
  templateUrl: './select-board.component.html',
  styleUrls: ['./select-board.component.scss']
})
export class SelectBoardComponent implements OnInit {

  constructor(private router : Router, private route: ActivatedRoute, private boardService: BoardService) { }
  boards = [];
  punjabBoards = [];
  kpkBoards = [];
  sindhBoards = [];
  balochBoards = [];
  ajkBoards = [];
  federalBoards = [];

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("classTitle")) {
        console.log(paramMap.get("classTitle"));
      }
    });
    this.boardService.getAllBoardes().subscribe(response => {
      if(response.success && response.data) {
        this.boards = response.data;
        this.boards.forEach(board => {
          if(board.province == 0){
            this.punjabBoards.push(board);
          }
          else if(board.province == 1) {
            this.kpkBoards.push(board);
          }
          else if(board.province == 2) {
            this.sindhBoards.push(board);
          }
          else if(board.province == 3) {
            this.balochBoards.push(board);
          }
          else if(board.province == 4) {
            this.ajkBoards.push(board);
          }
          else if(board.province == 5) {
            this.federalBoards.push(board);
          }
        })
      }
    });
  }
}
