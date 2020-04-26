import { Component, OnInit } from '@angular/core';
import {environment as ENV} from '@env/environment';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.scss']
})
export class AdminFooterComponent implements OnInit {
  test: Date = new Date();

  constructor() { }

  ngOnInit() {
  }

  openFbPage() {

    window.open(ENV.fbPageUrl, '_blank');

  }

}
