import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-exam',
  templateUrl: './select-exam.component.html',
  styleUrls: ['./select-exam.component.scss']
})
export class SelectExamComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  selectedExamType(){
    this.router.navigate(["/enterrollno"]);
  }
}
