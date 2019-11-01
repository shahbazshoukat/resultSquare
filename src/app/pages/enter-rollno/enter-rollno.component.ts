import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import { NgForm } from '@angular/forms';

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
  selectedBoard;
  resultTitle;
  resultData;
  tags;
  formError = false;
  errorMsg = '';
  result;
  constructor(private route: ActivatedRoute, private resultService: ResultService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("boardKey")) {
        this.selectedBoardKey = paramMap.get("boardKey");
        this.selectedBoard = this.selectedBoardKey.replace(/-/g, ' ');
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
      this.resultTitle = `${this.selectedBoard} ${this.selectedClass} Class ${this.selectedExamType} Result ${this.selectedYear}`;
    });
  }

  getResult() {
    this.resultService.getResult(this.selectedClass, this.selectedBoardKey, this.selectedYear, this.selectedExamType).subscribe(response => {
      this.resultData = response.data;
      this.tags = response.data.tags;
    })
  }

  findResult(form: NgForm) {
    console.log(form);
    this.formError = false;
    const regex = /^\d+$/;
    if(form.invalid) {
      return;
    }
    if(!form.value.rollNo || form.value.rollNo === '' || form.value.rollNo.length !== 6 || !regex.test(form.value.rollNo)) {
      this.formError = true;
      this.errorMsg = 'Enter a valid roll no';
      return;
    }
    this.resultService.findResult(form.value.rollNo, this.selectedClass, this.selectedBoardKey, this.selectedYear, this.selectedExamType).subscribe(response => {
      this.result = response;
      console.log(this.result);
    });

  }

}
