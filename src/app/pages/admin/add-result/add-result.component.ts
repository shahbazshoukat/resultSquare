import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResultService } from 'src/app/services/result.service';
import { ClassService } from 'src/app/services/class.service';
import { BoardService } from 'src/app/services/board.service';
import { Route } from '@angular/compiler/src/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss']
})
export class AddResultComponent implements OnInit, OnDestroy {

  params: string[] = [];
  tags: string[] = [];
  classes = [];
  boards = [];
  resultToUpdate = null;
  resultToUpdateId = null;
  isEdit = false;
  isLoading = true;
  selectedBoard;
  paramSub: any;
  resultSub: any;
  classesSub: any;
  boardSub: any;
  addResultSub: any;
  updateResultSub: any;
  selectedBoardKey;
  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json'
  };

  loadingAnim: AnimationItem;

  constructor(private resultService: ResultService, private classService: ClassService,
    private boardService: BoardService, private route: ActivatedRoute,
    private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.paramSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('resultId')) {
        this.resultToUpdateId = paramMap.get('resultId');
        this.resultSub = this.resultService.getResultById(this.resultToUpdateId).subscribe(
          response => {
          if (response.success && response.data) {
            this.isEdit = true;
            this.resultToUpdate = response.data;
            this.tags = this.resultToUpdate.tags;
            this.params = this.resultToUpdate.apiParams;
            this.isLoading = false;
          }
        },
        error => {
          this.isLoading = false;
          if (error && error.error && error.error.message) {
            this.alertService.danger(error.error.message);
          }
        });
      }

      if (paramMap.has('boardKey')) {

        this.selectedBoardKey = paramMap.get('boardKey');

      }
    });
    this.classesSub = this.classService.getAllClasses().subscribe(
      response => {
      if (response.success && response.data) {
        this.classes = response.data;
      }
    },
    error => {
      this.isLoading = false;
      if (error && error.error && error.error.message) {
        this.alertService.danger(error.error.message);
      }
    });
    this.boardSub = this.boardService.getAllBoardes().subscribe(
      response => {
      if ( response.success && response.data) {
        this.boards = response.data;
        this.isLoading = false;
      }
    },
    error => {
      this.isLoading = false;
      if (error && error.error && error.error.message) {
        this.alertService.danger(error.error.message);
      }
    });
  }

  loadingAnimationCreated(animationItem: AnimationItem): void {

    this.loadingAnim = animationItem;

  }

  addTag(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.tags.push(form.value.tagTitle);
    form.resetForm();
  }

  removeTag(tag: any) {
    const index = this.tags.indexOf(tag, 0);
    if (index > -1) {
      this.tags.splice(index, 1);
    }
  }

  cancel() {
    this.isEdit = false;
    this.router.navigate(['/rs-admin/results', this.selectedBoardKey]);
  }

  addResult(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      return;
    }
    if (form.value.status !== true) {
      form.value.status = false;
    }
    if (this.isEdit && this.resultToUpdateId) {
      this.updateResultSub = this.resultService.updateResult(this.resultToUpdateId, form.value.status, form.value.clas, form.value.board, form.value.year, form.value.announceDate, form.value.examType, form.value.resultUrl, this.tags ).subscribe(
        response => {
        if (response.success && response.message) {
          this.isLoading = false;
          this.alertService.success(response.message);
          this.isEdit = false;
          this.params = [];
          this.tags = [];
          this.router.navigate(['/rs-admin/results', this.selectedBoardKey]);
        }
      },
      error => {
        this.isLoading = false;
        if (error && error.error && error.error.message) {
          this.alertService.danger(error.error.message);
        }
      });
    } else {
      this.addResultSub = this.resultService.addResult(null, form.value.status, form.value.clas, form.value.board, form.value.year, form.value.announceDate, form.value.examType, form.value.resultUrl, this.tags ).subscribe(
        response => {
        if (response.success && response.message) {
          this.alertService.success(response.message);
          this.isLoading = false;
          this.params = [];
          // this.tags = [];
        }
      },
      error => {
        this.isLoading = false;
        if (error && error.error && error.error.message) {
          this.alertService.danger(error.error.message);
        }
      });
    }
    // form.resetForm();
  }

  changeBoard(boardId) {
    this.boardSub = this.boardService.getBoardById(boardId).subscribe(
      response => {
      this.selectedBoard = response.data;
      this.params = this.selectedBoard.apiParams;
      this.tags = this.selectedBoard.tags;
    },
    error => {
      this.isLoading = false;
      if (error && error.error && error.error.message) {
        this.alertService.danger(error.error.message);
      }
    });
  }

  ngOnDestroy() {

    this.paramSub && this.paramSub.unsubscribe();
    this.resultSub && this.resultSub.unsubscribe();
    this.boardSub && this.boardSub.unsubscribe();
    this.classesSub && this.classesSub.unsubscribe();
    this.addResultSub && this.addResultSub.unsubscribe();
    this.updateResultSub && this.updateResultSub.unsubscribe();

  }

}
