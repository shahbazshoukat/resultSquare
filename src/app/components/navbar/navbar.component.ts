import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

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
      key: '/educational-boards'
    }
  ];

  activeDomain: string;

  constructor(private router: Router) {

    this.router.events.pipe(takeWhile(this.isAlive)).subscribe(event => {

      if (event instanceof NavigationEnd) {

        const url = event.url.split('/');

        this.activeNavItem = `/${url && url[1]}`;

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

      this.router.navigate([navItem.key]);

    }

  }

  navigateToHomePage() {

    this.router.navigate(['/']);

  }

  ngOnDestroy() {

    this.alive = false;

  }

}
