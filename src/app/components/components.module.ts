import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FilterPanelComponent} from './filter-panel/filter-panel.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { SliderComponent } from '@app/components/slider/slider.component';
export function playerFactory() { return player; }

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        RouterModule,
        LottieModule.forRoot({player: playerFactory, useCache: true})
    ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SliderComponent,
    FilterPanelComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SliderComponent,
    FilterPanelComponent
  ]
})
export class ComponentsModule { }
