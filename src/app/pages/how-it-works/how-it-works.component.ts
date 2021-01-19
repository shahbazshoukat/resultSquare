import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment as ENV } from '@env/environment';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {

  constructor(private meta: Meta,
              private title: Title) { }

  ngOnInit() {

    this.title.setTitle(ENV.pageTitle);

  }

}
