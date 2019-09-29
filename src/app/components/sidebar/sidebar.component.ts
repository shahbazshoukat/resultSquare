import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/user.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: 'results', title: 'Results',  icon:'ni-planet text-blue', class: '' },
    { path: 'boards', title: 'Boards',  icon:'ni-pin-3 text-orange', class: '' },
    { path: 'classes', title: 'Classes',  icon:'ni-single-02 text-yellow', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private userService : UsersService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  logout() {
    this.userService.logout();
  }


}
