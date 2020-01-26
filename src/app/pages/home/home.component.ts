import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  classes = [];
  isLoading = true;
  isError = false;
  errorMsg = '';
  serviceSub: any;
  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json'
  };

  loadingAnim: AnimationItem;
  errorAnimOptions: AnimationOptions = {
    path: '/assets/lib/error.json'
  };

  errorAnim: AnimationItem;

  constructor(private router: Router, private classService: ClassService) { }

  ngOnInit() {
    this.init();
  }

  init() {

    this.isLoading = true;
    this.isError = false;
    this.errorMsg = '';
    this.serviceSub = this.classService.getAllClasses().subscribe(
      response => {
        if (response.success && response.data) {

          this.classes = response.data;
          if (!this.classes || this.classes.length === 0) {
            this.isError = true;
            this.errorMsg = 'No Class Found';
          }
          this.isLoading = false;
        }
      },
      error => {

        this.isLoading = false;

        this.isError = true;

        if (error && error.status && error.status === 404) {

          this.errorMsg = '404 - Not Found';

        } else {

          this.errorMsg = 'Something went wrong';

        }

      });

  }

  loadingAnimationCreated(animationItem: AnimationItem): void {

    this.loadingAnim = animationItem;

  }

  errorAnimationCreated(animationItem: AnimationItem): void {

    this.errorAnim = animationItem;

  }

  retry() {

    this.init();

  }

  onClassSelect(selectedClass) {

    if (selectedClass) {

      if (selectedClass.type === '1') {

        this.router.navigate(['/test', selectedClass.title]);

        return;

      } else if (selectedClass.type === '0') {

        if (selectedClass.title === 'FA' || selectedClass.title === 'FSC' || selectedClass.title === 'ICS' || selectedClass.title === 'ICOM') {

          this.router.navigate(['/class', selectedClass.title]);

        } else {

          this.router.navigate(['/result', selectedClass.title]);

        }

      }

    }

  }

  ngOnDestroy() {

    this.serviceSub && this.serviceSub.unsubscribe();

  }

}
