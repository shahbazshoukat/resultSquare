import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  sliderTitle = 'Are you looking for <br/> latest educational updates?';
  sliderDescription = 'Then don\'t worry! you are on the right place &#128578;. Here you can find educational updates from all over the 🇵🇰';
  constructor() { }

  ngOnInit() {
  }

}
