import { Component, OnInit } from '@angular/core';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  results = [];

  constructor(private resultService: ResultService) { }

  ngOnInit() {
    this.resultService.getAllResultes().subscribe(response => {
      if(response.data){
        this.results = response.data;
      }
    })
  }

}
