import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BoardService, ModelPaperService } from '@app/services';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { takeWhile } from 'rxjs/operators';
import * as Enums from '@app/app.enums';

@Component({
  selector: 'app-model-paper-detail',
  templateUrl: './model-paper-detail.component.html',
  styleUrls: ['./model-paper-detail.component.scss']
})
export class ModelPaperDetailComponent implements OnInit, OnDestroy {

  url = '';
  tags = [];
  alive = true;
  errorMsg = '';
  comments = [];
  isError = false;
  boardTitle: any;
  isLoading = false;
  modelPaperData: any;
  modelPaperTitle: any;
  selectedSection: any;
  selectedSubject: any;
  showComments = false;
  modelPaperDescription: any;
  selectedBoardDomain: string;
  commentSourceEnums = Enums.COMMENT_SOURCE;
  @ViewChild('resultPage', { static: false }) resultPage: ElementRef;

  errorAnimOptions: AnimationOptions = {
    path: '/assets/lib/error.json',
    loop: true,
    autoplay: true
  };

  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json',
    loop: true,
    autoplay: true
  };

  notAnnouncedAnimOptions: AnimationOptions = {
    path: '/assets/lib/not-announced.json',
    loop: true,
    autoplay: true
  };

  dotsLoaderAnimOptions: AnimationOptions = {
    path: '/assets/lib/dots-loader-circle.json',
    loop: true,
    autoplay: true
  };

  constructor(private meta: Meta,
              private title: Title,
              private router: Router,
              private _location: Location,
              private route: ActivatedRoute,
              private boardService: BoardService,
              private modelPaperService: ModelPaperService,
              private loadingBar: LoadingBarService) {

    // this.boardDomain = this.boardTitle = window.location.hostname.substring(0, window.location.hostname.indexOf('.'));

    this.route.paramMap.pipe(takeWhile(this.isAlive)).subscribe((paramMap: ParamMap) => {

      if (paramMap) {

        if (paramMap.has('boardDomain')) {

          this.selectedBoardDomain = paramMap.get('boardDomain');

        }

        if (paramMap.has('classTitle')) {

          this.selectedSection = paramMap.get('classTitle');

        }

        if (paramMap.has('subject')) {

          this.selectedSubject = paramMap.get('subject');

        }

      }

    });

  }

  ngOnInit() {

    this.getModelPaper();

    this.modelPaperTitle = '';

    this.getModelPaperTitleAndDescription();

    if (this.resultPage && this.resultPage.nativeElement) {

      this.resultPage.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});

    }

  }

  isAlive = () => {

    return this.alive;

  }

  getModelPaperTitleAndDescription() {

    if (this.modelPaperData) {

      this.modelPaperTitle = this.modelPaperData.title;

      this.modelPaperDescription = this.modelPaperData.description;

      this.title.setTitle(this.modelPaperTitle);

    }

  }

  getModelPaper() {

    this.isLoading = true;

    this.isError = false;

    this.errorMsg = '';

    const payload = {
      section: this.selectedSection,
      subject: this.selectedSubject,
      board: this.selectedBoardDomain
    };

    this.modelPaperService.getModelPaper(payload)
      .pipe(takeWhile(this.isAlive))
      .subscribe(

        response => {

          this.modelPaperData = response.data;

          if (this.modelPaperData) {

            this.tags = this.modelPaperData.tags;

            if (this.modelPaperData.comments) {

              this.comments = this.modelPaperData.comments;

              this.comments.reverse();

              this.showComments = true;

            }

            if (this.modelPaperData.board && this.modelPaperData.board.description) {

              this.modelPaperData.board.shortDesc = this.modelPaperData.board.description.substring(0, 110) + '...';

              this.boardTitle = this.modelPaperData.board.title;

            }

            this.getModelPaperTitleAndDescription();

          } else {

            this.isError = true;

            this.errorMsg = 'Model Paper Not Found';

          }

          this.isLoading = false;

          this.removeExistingTags();

          this.setMetaTags();

        },
        error => {

          this.isLoading = false;

          this.isError = true;

          if (error && error.status && error.status === 404) {

            this.errorMsg = '404 - Not Found';

          } else {

            this.errorMsg = 'Something went wrong';

          }

        });

  }

  setModelPaperDescriptionMetaTag() {

    let pageDescription = '';

    if (this.modelPaperData) {

      if (this.modelPaperData.board && this.modelPaperData.board.description) {

        pageDescription = pageDescription + this.modelPaperData.board.description;

      }

      if (this.modelPaperData.description) {

        pageDescription = pageDescription + this.modelPaperData.description;

      }

    }

    this.meta.updateTag({ name: 'description', content: pageDescription });

    this.meta.updateTag({ property: 'og:title', content: this.modelPaperTitle });

    this.meta.updateTag({ property: 'og:description', content: pageDescription });

  }

  setMetaTags() {

    if (Array.isArray(this.tags)) {

      this.meta.updateTag({ name: 'keywords', content: this.tags.toString() });

      this.meta.addTag({ property: 'article:tag', content: 'result'});

      this.meta.addTag({ property: 'article:tag', content: 'resultsquare'});

      this.meta.addTag({ property: 'article:tag', content: 'resultsquare.pk'});

      this.meta.addTag({ property: 'article:tag', content: 'result square pk'});

      this.meta.addTag({ property: 'article:tag', content: this.modelPaperTitle });

      this.tags.forEach(tag => {

        if (tag) {

          this.meta.addTag({ property: 'article:tag', content: tag });

        }

      });

    }

    this.setModelPaperDescriptionMetaTag();

  }

  removeExistingTags() {

    const existingMetaTags = this.meta.getTags('property=\'article:tag\'');

    if (Array.isArray(existingMetaTags)) {

      existingMetaTags.forEach(metaTag => {

        this.meta.removeTagElement(metaTag);

      });

    }

  }

  onPageLoad() {

    this.loadingBar.stop();

  }

  navigateToBoardResultPage() {

    window.open(this.url, '_blank');

  }

  backToHome() {

    this.router.navigate(['']);

  }

  goBack() {

    this.router.navigate(['']);

  }

  ngOnDestroy() {

    this.alive = false;

  }

}
