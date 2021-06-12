import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NavigationEnd, Router} from '@angular/router';
import { environment as ENV } from '@env/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  alive = true;
  isCollapsed = true;
  activeNavItem: string;

  navItems = [
    {
      label: 'Federal Boards',
      key: 'federal'
    },
    {
      label: 'Punjab Boards',
      key: 'punjab'
    },
    {
      label: 'KPK Boards',
      key: 'kpk'
    },
    {
      label: 'Sindh Boards',
      key: 'sindh'
    },
    {
      label: 'Balochistan Boards',
      key: 'balochistan'
    },
    {
      label: 'AJK Boards',
      key: 'ajk'
    }
  ];

  activeDomain: string;

  constructor(private router: Router) {

    this.router.events.pipe(takeWhile(this.isAlive)).subscribe(event => {

      if (event instanceof NavigationEnd) {

        this.activeNavItem = event.url;

      }

    });

  }

  ngOnInit() {

    this.activeDomain = window.location.hostname && window.location.hostname.substring(0, window.location.hostname.indexOf('.'));

  }

  isAlive = () => {

    return this.alive;

  }

  navigateToNavItem(navItem) {

    if (navItem && navItem.key) {

      window.location.href = `${window.location.protocol}//${navItem.key}.${ENV.host}`;

    }

  }

  navigateToHomePage() {

    window.location.href = `${window.location.protocol}//${ENV.host}`;

  }

  ngOnDestroy() {

    this.alive = false;

  }

}
