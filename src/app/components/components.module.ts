import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
export function playerFactory() { return player; }

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    RouterModule,
    LottieModule.forRoot({ player: playerFactory, useCache: true })
  ],
  declarations: [
    FooterComponent,
    NavbarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent
  ]
})
export class ComponentsModule { }
