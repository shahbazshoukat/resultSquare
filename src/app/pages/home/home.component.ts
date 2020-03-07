import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import {ResultService} from '@app/services/result.service';
import {PaginationInstance} from 'ngx-pagination';

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
  result: any;
  provinces = [
    'All',
    'Punjab',
    'KPK',
    'Sindh',
    'Balochistan',
    'AJK',
    'Federal'
  ];
  selectedProvince = 'all';
 status: {
   Announced: { value: true, selected: true},
   UnAnnounced: { value: false, selected: true}
 };
  showSearchResults = false;
  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json'
  };

  loadingAnim: AnimationItem;
  errorAnimOptions: AnimationOptions = {
    path: '/assets/lib/error.json'
  };

  errorAnim: AnimationItem;
  results = [];
  filteredResults = [];
  totalResults = 0;
  noOfPages = 0;
  pages;
  selectedPageNo = 1;
  resultsSubscription$: any;
  config: PaginationInstance = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: this.totalResults
  };

  constructor(private router: Router, private resultService: ResultService) { }

  ngOnInit() {

    this.getLatestResults();

  }

  loadingAnimationCreated(animationItem: AnimationItem): void {

    this.loadingAnim = animationItem;

  }

  errorAnimationCreated(animationItem: AnimationItem): void {

    this.errorAnim = animationItem;

  }

  getLatestResults() {

    this.isLoading = true;

    this.resultsSubscription$ = this.resultService.getLatestResults()
      .subscribe(
        response => {

          if (response && response.data) {

            this.results = response.data;

            this.filteredResults = this.results;

            this.selectedProvince = 'All';

            this.totalResults = this.results && this.results.length;

          }

          this.isLoading = false;

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

  filterByProvince(province) {

    if (province) {

      this.filteredResults = [];

      this.selectedProvince = province;

      this.selectedPageNo = 1;

      console.log(province);

      if (this.results) {

        if (this.selectedProvince === 'All') {

          this.filteredResults = this.results;

          return;

        }

        for (const res of this.results) {

          if (res && res.board && res.board.province === this.selectedProvince) {

            this.filteredResults.push(res);

          }

        }

      }

    }

  }

  onPageChange(event) {
    console.log(event);
    this.config.currentPage = event;
  }

  retry() {
    this.getLatestResults();
  }

  ngOnDestroy() {

    this.serviceSub && this.serviceSub.unsubscribe();

  }

}
