import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  classes = [];
  isLoading = true;
  constructor(private router : Router, private classService: ClassService) { }

  ngOnInit() {
    this.isLoading = true;
    this.classService.getAllClasses().subscribe(response => {
      if(response.success && response.data) {
        this.classes = response.data;
        this.isLoading = false;
      }
    })
  }
}
