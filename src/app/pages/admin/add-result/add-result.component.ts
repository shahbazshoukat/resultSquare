import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss']
})
export class AddResultComponent implements OnInit {

  constructor(private resultService: ResultService) { }

  ngOnInit() {
  }

  addResult(form: NgForm){
    if(form.invalid){
      return;
    }
    this.resultService.addResult(null, form.value.status,form.value.clas, form.value.board, form.value.year, form.value.announceDate, form.value.examType, form.value.apiMode, form.value.resultUrl, form.value.apiUrl, form.value.requestType, form.value.apiParams, form.value.tags );

  }

}
