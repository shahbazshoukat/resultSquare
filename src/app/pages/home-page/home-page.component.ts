import { Component, OnInit } from '@angular/core';
import * as Enums from '@app/app.enums';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  allEnums = Enums;
  sliderTitle = 'Are you looking for <br/> latest educational updates?';
  sliderDescription = 'Then don\'t worry! you are on the right place &#128578;. Here you can find educational updates from all over the 🇵🇰';
  menuItems = [
    {
      label: 'Results',
      key: Enums.HOME_MENU_ITEMS.RESULTS
    },
    {
      label: 'Date Sheets',
      key: Enums.HOME_MENU_ITEMS.DATE_SHEETS
    },
    {
      label: 'Model Papers',
      key: Enums.HOME_MENU_ITEMS.MODEL_PAPERS
    }
  ];

  selectedMenuItem = this.menuItems[0];

  constructor() { }

  ngOnInit() {
  }

  selectMenuItem = (menuItem) => {

    this.selectedMenuItem = menuItem;

  }

}
