import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['./select-year.component.scss']
})
export class SelectYearComponent implements OnInit {

  selectedBoardKey;
  selectedClass;
  selectedBoard;
  years;

  constructor(private router : Router, private resultService: ResultService, private boardService: BoardService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("boardKey")) {
        this.selectedBoardKey = paramMap.get("boardKey");
      }
      if(paramMap.has("classTitle")) {
        this.selectedClass = paramMap.get("classTitle");
        this.getResultYears(this.selectedClass, this.selectedBoardKey);
      }
    });
  }

  getResultYears(selectedClass, selectedBoardKey) {
    this.resultService.getResultYears(selectedClass, selectedBoardKey).subscribe(response => {
      this.years = response.data;
      console.log(this.years);
    })
  }

  selectedYear() {
    this.router.navigate(["/selectexam"]);
  }
}
