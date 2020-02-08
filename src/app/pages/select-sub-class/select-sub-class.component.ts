import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';

@Component({
  selector: 'app-select-sub-class',
  templateUrl: './select-sub-class.component.html',
  styleUrls: ['./select-sub-class.component.scss']
})
export class SelectSubClassComponent implements OnInit, OnDestroy {

  paramSub: any;
  isLoading = false;
  selectedClass;
  isError = false;
  errorMsg = '';
  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json'
  };

  loadingAnim: AnimationItem;
  errorAnimOptions: AnimationOptions = {
    path: '/assets/lib/error.json'
  };

  errorAnim: AnimationItem;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.isLoading = true;

    this.paramSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {

      this.isLoading = false;

      this.isError = false;

      this.errorMsg = '';

      if (paramMap.has('classTitle')) {

        this.selectedClass = paramMap.get('classTitle');

      }

    });

  }

  loadingAnimationCreated(animationItem: AnimationItem): void {

    this.loadingAnim = animationItem;

  }

  errorAnimationCreated(animationItem: AnimationItem): void {

    this.errorAnim = animationItem;

  }

  onClassSelected(selectedClassPart) {

    let clas;

    if (selectedClassPart) {

      if (selectedClassPart === 'Part 1') {

        clas = '11th';

        this.router.navigate(['/result', clas]);

      } else if (selectedClassPart === 'Part 2') {

        clas = '12th';

        this.router.navigate(['/result', clas]);

      }

    }

  }

  backToHome() {

    this.router.navigate(['']);

  }

  ngOnDestroy() {

    this.paramSub && this.paramSub.unsubscribe();

  }

}
