import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BoardService } from 'src/app/services/board.service';
import { Board } from 'src/app/models/board.model';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-select-board',
  templateUrl: './select-board.component.html',
  styleUrls: ['./select-board.component.scss']
})
export class SelectBoardComponent implements OnInit {

  constructor(private router : Router, private route: ActivatedRoute, private boardService: BoardService, private classService: ClassService) { }
  boards: Board[] = [];
  punjabBoards = [];
  kpkBoards = [];
  sindhBoards = [];
  balochBoards = [];
  ajkBoards = [];
  federalBoards = [];
  filteredBoards = [];
  selectedClass;
  routerLinkClass;
  loading = true;
  selectedSection;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.loading = true;
      if(paramMap.has("classTitle")) {
        this.selectedClass = paramMap.get("classTitle");
        this.getBoardsBySectionTitle(this.selectedClass);
      }
    });
  }

  getBoardsBySectionTitle(title) {
    this.boardService.getBoardBySectionTitle(title).subscribe(response => {
      this.boards = response.data;
      console.log(this.boards);
      this.sortBoardsByProvince();
    });
  }

  sortBoardsByProvince() {
    this.boards.forEach(board => {
      if(board.province === "Punjab"){
        this.punjabBoards.push(board);
      }
      else if(board.province === "KPK") {
        this.kpkBoards.push(board);
      }
      else if(board.province === "Sindh") {
        this.sindhBoards.push(board);
      }
      else if(board.province === "Balochistan" ) {
        this.balochBoards.push(board);
      }
      else if(board.province === "AJK") {
        this.ajkBoards.push(board);
      }
      else if(board.province === "Federal") {
        this.federalBoards.push(board);
      }
    });
  }
}
