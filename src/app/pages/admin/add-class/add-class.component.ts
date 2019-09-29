import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {

  constructor(private classService : ClassService) { }

  ngOnInit() {
  }

  addClass(form : NgForm){
    if(form.invalid){
      return;
    }
    this.classService.addClass(form.value.title, form.value.type);
  }

}
