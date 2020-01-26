import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';

@Component({
  selector: 'app-select-exam',
  templateUrl: './select-exam.component.html',
  styleUrls: ['./select-exam.component.scss']
})
export class SelectExamComponent implements OnInit, OnDestroy {

  selectedBoardKey = '';
  selectedClass = '';
  selectedYear = '';
  examTypes;
  isLoading = false;
  isError = false;
  errorMsg = '';
  paramSub: any;
  showSupply = true;
  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json'
  };

  loadingAnim: AnimationItem;
  errorAnimOptions: AnimationOptions = {
    path: '/assets/lib/error.json'
  };

  errorAnim: AnimationItem;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.showSupply = true;

    this.examTypes = {

      annual: 'annual',

      supply: 'supply'

    };

    this.paramSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {

      this.isLoading = true;

      this.isError = false;

      this.errorMsg = '';

      if (paramMap.has('boardKey')) {

        this.selectedBoardKey = paramMap.get('boardKey');

      }

      if (paramMap.has('classTitle')) {

        this.selectedClass = paramMap.get('classTitle');

        if (this.selectedClass === '5th' || this.selectedClass === '8th') {

          this.showSupply = false;

        }

      }

      if (paramMap.has('year')) {

        this.selectedYear = paramMap.get('year');

        this.isLoading = false;

      }

    });

  }

  loadingAnimationCreated(animationItem: AnimationItem): void {

    this.loadingAnim = animationItem;

  }

  errorAnimationCreated(animationItem: AnimationItem): void {

    this.errorAnim = animationItem;

  }

  backToHome() {

    this.router.navigate(['']);

  }

  ngOnDestroy() {

    this.paramSub && this.paramSub.unsubscribe();

  }

}
