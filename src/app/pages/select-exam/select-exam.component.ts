import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-select-exam',
  templateUrl: './select-exam.component.html',
  styleUrls: ['./select-exam.component.scss']
})
export class SelectExamComponent implements OnInit {

  selectedBoardKey;
  selectedClass;
  selectedYear;
  examTypes;

  constructor(private router : Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.examTypes = {
      annual: "annual",
      supply: "supply"
    };
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("boardKey")) {
        this.selectedBoardKey = paramMap.get("boardKey");
      }
      if(paramMap.has("classTitle")) {
        this.selectedClass = paramMap.get("classTitle");
      }
      if(paramMap.has("year")) {
        this.selectedYear = paramMap.get("year");
      }
    });
  }
}
