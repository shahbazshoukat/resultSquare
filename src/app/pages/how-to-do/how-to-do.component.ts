import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment as ENV } from '@env/environment';

@Component({
  selector: 'app-how-to-do',
  templateUrl: './how-to-do.component.html',
  styleUrls: ['./how-to-do.component.scss']
})
export class HowToDoComponent implements OnInit {

  constructor(private meta: Meta,
              private title: Title) { }

  ngOnInit() {

    this.title.setTitle(ENV.pageTitle);

  }

}
