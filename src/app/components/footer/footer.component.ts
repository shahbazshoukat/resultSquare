import { Component, OnInit } from '@angular/core';
import { environment as ENV } from '@env/environment';
import { UtilService } from '@app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  test: Date = new Date();

  constructor(private router: Router,
              private utilService: UtilService) { }

  ngOnInit() {
  }

  openFbPage() {

    if (ENV && ENV.fbPageUrl) {

      this.utilService.openLink(ENV.fbPageUrl);

    }

  }

  openTwitterPage() {

    if (ENV && ENV.twitterPageUrl) {

      this.utilService.openLink(ENV.twitterPageUrl);

    }

  }

  openYoutubePage() {

    if (ENV && ENV.youtubePageUrl) {

      this.utilService.openLink(ENV.youtubePageUrl);

    }

  }

  navigateToHomePage() {

    this.router.navigate(['/']);

  }

}
