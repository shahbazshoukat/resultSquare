import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    LottieModule.forRoot({ player: playerFactory, useCache: true })
  ],
  declarations: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    AdminNavbarComponent,
    MainMenuComponent,
    AdminFooterComponent
  ],
    exports: [
        SidebarComponent,
        FooterComponent,
        NavbarComponent,
        AdminNavbarComponent,
        MainMenuComponent,
        AdminFooterComponent
    ]
})
export class ComponentsModule { }
