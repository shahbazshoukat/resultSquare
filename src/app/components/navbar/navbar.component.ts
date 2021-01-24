import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  alive = true;
  isCollapsed = true;
  activeNavItem: string;

  constructor(private router: Router) {

    this.router.events.pipe(takeWhile(this.isAlive)).subscribe(event => {

      if (event instanceof NavigationEnd) {

        this.activeNavItem = event.url;

      }

    });

  }

  ngOnInit() {

  }

  isAlive = () => {

    return this.alive;

  }

  ngOnDestroy() {

    this.alive = false;

  }

}
