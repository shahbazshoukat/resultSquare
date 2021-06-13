import { Component, OnInit } from '@angular/core';
import * as Enums from '@app/app.enums';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  allEnums = Enums;
  selectedNavItem: any;
  sliderTitle = 'Resultsquare.pk';
  sliderDescription = 'View latest educational updates from all over the Pakistan';
  miniNavItems = [
    {
      label: 'Results',
      key: Enums.MINI_NAV_ITEMS.RESULTS,
      pageTitle: 'Results'
    },
    {
      label: 'Date Sheets',
      key: Enums.MINI_NAV_ITEMS.DATE_SHEETS,
      pageTitle: 'Date Sheets'
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.checkSelectedNavItem();

  }

  checkSelectedNavItem = () => {

    if (this.route && this.route.snapshot && this.route.snapshot.url && this.route.snapshot.url[0] && this.route.snapshot.url[0].path
      && Array.isArray(this.miniNavItems)) {

      this.selectedNavItem = this.miniNavItems.find(item => item && item.key === this.route.snapshot.url[0].path);

    } else {

      this.selectedNavItem = this.miniNavItems[0];

    }

  }

}
