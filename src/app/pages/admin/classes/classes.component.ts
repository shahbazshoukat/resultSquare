import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  classes = [];

  constructor(private classService: ClassService) { }

  ngOnInit() {
    this.classService.getAllClasses().subscribe(response => {
      if(response.data){
        this.classes = response.data;
      }
    })
  }

}
