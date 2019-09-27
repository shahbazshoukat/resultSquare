import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-board',
  templateUrl: './select-board.component.html',
  styleUrls: ['./select-board.component.scss']
})
export class SelectBoardComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  selectedBoard() {
    this.router.navigate(["/selectyear"]);
  }
}
