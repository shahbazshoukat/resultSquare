import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Class } from '../../../models/class.model';
@Component({
  selector: 'add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {

  classToEdit: Class ={
    _id: null,
    title: null,
    type: null
  }
  isEdit = false;
  constructor(private classService : ClassService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("classId")){
        this.isEdit = true;
        this.classToEdit._id = paramMap.get("classId");
      }
      if(paramMap.has("classTitle")){
        this.classToEdit.title = paramMap.get("classTitle");
      }
      if(paramMap.has("classType")){
        this.classToEdit.type = paramMap.get("classType");
      }
    })
  }

  cancel() {
    this.isEdit = false;
    this.router.navigate(["/rs-admin/classes"]);
  }

  addClass(form : NgForm){
    if(form.invalid){
      return;
    }
    if(this.isEdit && this.classToEdit._id ){
      this.classService.updateClass(this.classToEdit._id, form.value.title, form.value.type).subscribe(response => {
        if(response.success && response.message){
          alert(response.message);
          this.isEdit = false;
          this.router.navigate(["/rs-admin/classes"]);
        }
      })
    }
    else{
      this.classService.addClass(form.value.title, form.value.type).subscribe(response =>{
        if(response.success && response.message){
          alert(response.message);
        }
      })
    }
    form.resetForm();
  }

}
