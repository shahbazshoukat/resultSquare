import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResultService } from 'src/app/services/result.service';
import { ClassService } from 'src/app/services/class.service';
import { BoardService } from 'src/app/services/board.service';
import { Route } from '@angular/compiler/src/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss']
})
export class AddResultComponent implements OnInit {

  params: string[] = [];
  tags: string[] = [];
  classes = [];
  boards = [];
  resultToUpdate = null;
  resultToUpdateId = null;
  isEdit = false;
  isLoading = true;
  selectedBoard;

  constructor(private resultService: ResultService, private classService: ClassService, private boardService: BoardService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('resultId')) {
        this.resultToUpdateId = paramMap.get('resultId');
        this.resultService.getResultById(this.resultToUpdateId).subscribe(response => {
          if (response.success && response.data) {
            this.isEdit = true;
            this.resultToUpdate = response.data;
            this.tags = this.resultToUpdate.tags;
            this.params = this.resultToUpdate.apiParams;
            this.isLoading = false;
          }
        });
      }
    });
    this.classService.getAllClasses().subscribe(response => {
      if (response.success && response.data) {
        this.classes = response.data;
      }
    });
    this.boardService.getAllBoardes().subscribe(response => {
      if ( response.success && response.data) {
        this.boards = response.data;
        this.isLoading = false;
      }
    });
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
    this.router.navigate(['/rs-admin/results']);
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
      this.resultService.updateResult(this.resultToUpdateId, form.value.status, form.value.clas, form.value.board, form.value.year, form.value.announceDate, form.value.examType, form.value.resultUrl, this.tags ).subscribe(response => {
        if (response.success && response.message) {
          this.isLoading = false;
          alert(response.message);
          this.isEdit = false;
          this.params = [];
          this.tags = [];
          this.router.navigate(['/rs-admin/results']);
        }
      });
    } else {
      this.resultService.addResult(null, form.value.status, form.value.clas, form.value.board, form.value.year, form.value.announceDate, form.value.examType, form.value.resultUrl, this.tags ).subscribe(response => {
        if (response.success && response.message) {
          this.isLoading = false;
          alert(response.message);
          this.params = [];
          this.tags = [];
        }
      });
    }
    form.resetForm();
  }

  changeBoard(boardId) {
    this.boardService.getBoardById(boardId).subscribe(response => {
      this.selectedBoard = response.data;
      this.params = this.selectedBoard.apiParams;
      this.tags = this.selectedBoard.tags;
    });
  }

}
