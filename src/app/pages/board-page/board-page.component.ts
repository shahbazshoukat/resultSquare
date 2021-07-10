import { Component, OnInit } from '@angular/core';
import * as Enums from '@app/app.enums';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {

  allEnums = Enums;
  sliderTitle = 'Are you looking for <br/> latest educational updates?';
  sliderDescription = 'Then don\'t worry! you are on the right place &#128578;. Here you can find educational updates from all over the 🇵🇰';

  menuItems = [
    {
      label: 'Results',
      route: '/results',
      key: Enums.HOME_MENU_ITEMS.RESULTS
    },
    {
      label: 'Date Sheets',
      route: '/date-sheets',
      key: Enums.HOME_MENU_ITEMS.DATE_SHEETS
    },
    {
      label: 'Model Papers',
      route: '/model-papers',
      key: Enums.HOME_MENU_ITEMS.MODEL_PAPERS
    }
  ];

  selectedMenuItem = this.menuItems[0];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    // this.checkSelectedNavItem();

  }

  checkSelectedNavItem = () => {

    if (this.route && this.route.snapshot && this.route.snapshot.url && this.route.snapshot.url[0] && this.route.snapshot.url[0].path
      && Array.isArray(this.menuItems)) {

      this.selectedMenuItem = this.menuItems.find(item => item && item.key === this.route.snapshot.url[0].path);

    } else {

      this.selectedMenuItem = this.menuItems[0];

    }

  }

  selectMenuItem = (menuItem) => {

    this.selectedMenuItem = menuItem;

  }

}
