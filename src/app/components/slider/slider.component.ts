import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ClassService, NewsService} from '@app/services';
import { BoardService } from '@app/services';
import { ResultService } from '@app/services';
import { AnimationOptions } from 'ngx-lottie';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {

  alive = true;
  currentPageTitle = 'results';
  @ViewChild('subHeader', { static: false }) subHeader: ElementRef;
  @ViewChild('bgWrapper', { static: false }) bgWrapper: ElementRef;

  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json',
    loop: true,
    autoplay: true
  };

  constructor(private newsService: NewsService,
              private classService: ClassService,
              private boardService: BoardService,
              private resultService: ResultService,
              private renderer: Renderer2,
              private router: Router,
              private route: ActivatedRoute) {

    this.router.events.pipe(takeWhile(this.isAlive)).subscribe(event => {

      if (event instanceof NavigationEnd) {

        const url = event.url.split('/');

        if (url && url[1]) {

          this.currentPageTitle = url[1].replace('-', ' ');

        } else {

          this.currentPageTitle = 'results';

        }

      }

    });

  }

  ngOnInit() {

    document.addEventListener('scroll', this.stickHeaderOnScroll);

  }

  isAlive = () => {

    return this.alive;

  }

  stickHeaderOnScroll = () => {

    const offSetHeightOfMainElement = this.bgWrapper && this.bgWrapper.nativeElement && this.bgWrapper.nativeElement.offsetHeight;

    const sticky = offSetHeightOfMainElement ? offSetHeightOfMainElement - 10 : 590;

    if (this.subHeader && this.subHeader.nativeElement) {

      if (window.pageYOffset > sticky) {

        this.renderer.addClass(this.subHeader.nativeElement, 'stickySubHeader');

      } else {

        this.renderer.removeClass(this.subHeader.nativeElement, 'stickySubHeader');

      }

    }

  }

  ngOnDestroy() {

    this.alive = false;

    document.removeEventListener('scroll', this.stickHeaderOnScroll);

  }

}
