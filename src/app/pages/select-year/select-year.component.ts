import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['./select-year.component.scss']
})
export class SelectYearComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  selectedYear() {
    this.router.navigate(["/selectexam"]);
  }
}
