import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResultService } from 'src/app/services/result.service';
import { ClassService } from 'src/app/services/class.service';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss']
})
export class AddResultComponent implements OnInit {

  params: string[] = [];
  tags: string[] = [];
  classes = [];
  boards = [];

  constructor(private resultService: ResultService, private classService: ClassService, private boardService: BoardService) { }

  ngOnInit() {
    this.classService.getAllClasses().subscribe(response => {
      console.log(response);
      if(response.data) {
        this.classes = response.data;
      }
    });
    this.boardService.getAllBoardes().subscribe(response => {
      console.log(response);
      if(response.data) {
        this.boards = response.data;
      }
    })
  }

  addTag(form: NgForm) {
    this.tags.push(form.value.tagTitle);
  }

  addParam(form: NgForm) {
    this.params.push(form.value.paramTitle);
  }

  addResult(form: NgForm){
    if(form.invalid){
      return;
    }
    console.log(form.value);
    this.resultService.addResult(null, form.value.status,form.value.clas, form.value.board, form.value.year, form.value.announceDate, form.value.examType, form.value.apiMode, form.value.resultUrl, form.value.apiUrl, form.value.requestType, this.params, this.tags );

  }

}
