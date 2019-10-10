import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  classes = [];
  constructor(private classService: ClassService, private router: Router) { }

  ngOnInit() {
   
    this.classService.getAllClasses().subscribe(response => {
      if(response.success && response.data){
        this.classes = response.data;
      }
    });
  }

  removeClass(classId: string){
    this.classService.deleteClass(classId).subscribe(response => {
      if(response.success && response.message && response.data) {
        this.classes.forEach((cls, index) => {
          if(cls._id === classId) {
             this.classes.splice(index, 1);
          }
        })
         alert(response.message);
       }
    })
  }

  editClass(clas: any) {
    this.router.navigate(["/rs-admin/add-class", {classId: clas._id, classTitle: clas.title, classType: clas.type}]);
  }

}
