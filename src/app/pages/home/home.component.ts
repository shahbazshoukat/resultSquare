import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment as ENV } from '@env/environment';
import * as Enums from '@app/app.enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  alive = true;
  pageViewEnums = Enums.PAGE_VIEW;
  pageView = Enums.PAGE_VIEW.HOME;

  constructor() {

  }

  ngOnInit() {

    const host = window.location.hostname;

    const domain = host && host.substring(0, host.indexOf('.'));

    if (domain) {

      this.pageView = ENV.provinces.includes(domain) ? this.pageViewEnums.PROVINCE : this.pageViewEnums.BOARD;

    }

    console.log(window.location, host, domain, this.pageView);

  }

  isAlive = () => {

    return this.alive;

  }

  ngOnDestroy() {

   this.alive = false;

  }

}
