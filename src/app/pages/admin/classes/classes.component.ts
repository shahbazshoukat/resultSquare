import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit, OnDestroy {

  classes = [];
  filteredClasses = [];
  isSearching = false;
  isLoading = true;
  classesSub: any;
  removeClassSub: any;
  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json'
  };

  loadingAnim: AnimationItem;

  constructor(private classService: ClassService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.isLoading = true;
    this.classesSub = this.classService.getAllClasses().subscribe(
      response => {
      if (response.success && response.data) {
        this.classes = response.data;
        this.filteredClasses = this.classes;
        this.isLoading = false;
      }
    },
    error => {
      this.isLoading = false;
      if (error && error.error && error.error.message) {
        this.alertService.danger(error.error.message);
      }
    });
  }

  loadingAnimationCreated(animationItem: AnimationItem): void {

    this.loadingAnim = animationItem;

  }

  removeClass(classId: string) {
    this.isLoading = true;
    this.removeClassSub = this.classService.deleteClass(classId).subscribe(
      response => {
      if (response.success && response.message && response.data) {
        this.classes.forEach((cls, index) => {
          if (cls._id === classId) {
             this.classes.splice(index, 1);
          }
        });
        this.isLoading = false;
        this.alertService.success(response.message);
       }
    },
    error => {
      this.isLoading = false;
      if (error && error.error && error.error.message) {
        this.alertService.danger(error.error.message);
      }
    });
  }

  editClass(clas: any) {
    this.router.navigate(['/rs-admin/add-class', {classId: clas._id, classTitle: clas.title, classType: clas.type}]);
  }

  searchClasses(event) {

    this.isSearching = true;

    const searchQuery = event.target.value.toLowerCase();

    this.filteredClasses = this.classes.filter(cls => {

      return cls.title.toLowerCase().includes(searchQuery) || cls.type.toLowerCase().includes(searchQuery);

    });

  }

  ngOnDestroy() {

    this.classesSub && this.classesSub.unsubscribe();
    this.removeClassSub && this.removeClassSub.unsubscribe();

  }

}
