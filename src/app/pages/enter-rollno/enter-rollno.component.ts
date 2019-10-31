import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-enter-rollno',
  templateUrl: './enter-rollno.component.html',
  styleUrls: ['./enter-rollno.component.scss']
})
export class EnterRollNoComponent implements OnInit {

  selectedBoardKey;
  selectedClass;
  selectedYear;
  selectedExamType;

  constructor(private route: ActivatedRoute, private resultService: ResultService) { }

  ngOnInit() {
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
      if(paramMap.has("examType")) {
        this.selectedExamType = paramMap.get("examType");
        this.getResult();
      }
    })
  }

  getResult() {
    this.resultService.getResult(this.selectedClass, this.selectedBoardKey, this.selectedYear, this.selectedExamType).subscribe(response => {
      console.log(response);
    })
  }

}
