import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment as ENV } from '@env/environment';
import * as Enums from '@app/app.enums';
import {ActivatedRoute, Router} from '@angular/router';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  alive = true;
  pageViewEnums = Enums.PAGE_VIEW;
  pageView = Enums.PAGE_VIEW.HOME;

  constructor(private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {

    const host = window.location.hostname;

    const domain = host && host.substring(0, host.indexOf('.'));

    if (domain && domain !== ENV.appDomain) {

      this.pageView = ENV.provinces.includes(domain) ? this.pageViewEnums.PROVINCE : this.pageViewEnums.BOARD;

    }

  }

  isAlive = () => {

    return this.alive;

  }

  ngOnDestroy() {

   this.alive = false;

  }

}
