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

  removeClass(classId: string, title) {

    const isMad = confirm('Are you mad?');

    if (isMad) {
      const isReallyMad = confirm('Are you really MAD? It will destroy all your boards and results!!!');
      if (isReallyMad) {
        const classTitle = prompt('Ohh! you are mad! So enter class name to delete...');
        if (classTitle === title) {

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

        } else {

          this.alertService.warning('Ohh Thank God! Invalid class title');

        }

      } else {
        this.alertService.success('Thank God, you are not really mad');
      }
    } else {
      this.alertService.success('Thank God, you are not mad');
    }
  }

  editClass(clas: any) {
    this.router.navigate(['/rs-admin/add-class', {classId: clas._id, classTitle: clas.title, classType: clas.type}]);
  }

  ngOnDestroy() {

    this.classesSub && this.classesSub.unsubscribe();
    this.removeClassSub && this.removeClassSub.unsubscribe();

  }

}
