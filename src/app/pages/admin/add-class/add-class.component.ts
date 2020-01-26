import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Class } from '../../../models/class.model';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';
import {AlertService} from 'ngx-alerts';

@Component({
  selector: 'add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit, OnDestroy {

  classToEdit: Class = {
    _id: null,
    title: null,
    type: null
  };
  isEdit = false;
  isLoading = true;
  paramsub: any;
  addClassSub: any;
  updateClassSub: any;
  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json'
  };

  loadingAnim: AnimationItem;

  constructor(private classService: ClassService, private route: ActivatedRoute, private router: Router,
              private alertService: AlertService) { }

  ngOnInit() {
    this.paramsub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('classId')) {
        this.isEdit = true;
        this.classToEdit._id = paramMap.get('classId');
      }
      if (paramMap.has('classTitle')) {
        this.classToEdit.title = paramMap.get('classTitle');
      }
      if (paramMap.has('classType')) {
        this.classToEdit.type = paramMap.get('classType');
      }
      this.isLoading = false;
    });
  }

  loadingAnimationCreated(animationItem: AnimationItem): void {

    this.loadingAnim = animationItem;

  }

  cancel() {
    this.isEdit = false;
    this.router.navigate(['/rs-admin/classes']);
  }

  addClass(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      return;
    }
    if (this.isEdit && this.classToEdit._id ) {
      this.updateClassSub = this.classService.updateClass(this.classToEdit._id, form.value.title, form.value.type).subscribe(
        response => {
        if (response.success && response.message) {
          this.isLoading = false;
          this.alertService.success(response.message);
          this.isEdit = false;
          this.router.navigate(['/rs-admin/classes']);
        }
      },
      error => {
        this.isLoading = false;
        if (error && error.error && error.error.message) {
          this.alertService.danger(error.error.message);
        }
      });
    } else {
      this.addClassSub = this.classService.addClass(form.value.title, form.value.type).subscribe(
        response => {
        if (response.success && response.message) {
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
    form.resetForm();
  }

  ngOnDestroy() {

    this.paramsub && this.paramsub.unsubscribe();
    this.addClassSub && this.addClassSub.unsubscribe();
    this.updateClassSub && this.updateClassSub.unsubscribe();

  }

}
