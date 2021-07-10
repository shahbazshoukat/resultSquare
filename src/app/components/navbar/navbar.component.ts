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
      label: 'Home',
      key: '/'
    },
    {
      label: 'Results',
      key: '/results'
    },
    {
      label: 'Date Sheets',
      key: '/date-sheets'
    },
    {
      label: 'Model Papers',
      key: '/model-papers'
    },
    {
      label: 'Educational Boards',
      key: '/boards'
    }
  ];

  activeDomain: string;

  constructor(private router: Router) {

    this.router.events.pipe(takeWhile(this.isAlive)).subscribe(event => {

      if (event instanceof NavigationEnd) {

        this.activeNavItem = event.url;

        console.log(event);

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
