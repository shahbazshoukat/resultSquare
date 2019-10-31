import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgForm } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { BoardService } from 'src/app/services/board.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { pipe } from '@angular/core/src/render3';
import { catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.scss']
})
export class AddBoardComponent implements OnInit {

  examTypes = [];
  selectedExamTypes = [];
  selectedET = [];
  examTypesSettings: IDropdownSettings = {};
  classes = [];
  params: string[] = [];
  tags: string[] = [];
  selectedClasses = [];
  selectedCls = [];
  classesSettings: IDropdownSettings = {};
  cities:string[] = [];
  boardToUpdate = null;
  boardToUpdateId;
  isEdit: boolean = false;
  isLoading = true;

  constructor(private classService: ClassService, private boardService: BoardService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.examTypes = [
      {_id:0, title: 'Annual'},
      {_id:1, title: 'Supply'},
      {_id:2, title: 'Test'},
      {_id:3, title: 'Retotal'},
    ];
    this.examTypesSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    this.classesSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("boardId")){
        this.isLoading = true;
        this.boardToUpdateId = paramMap.get("boardId");
        this.boardService.getBoardById(this.boardToUpdateId).subscribe(response => {
          if(response.data && response.success) {
            this.boardToUpdate = response.data;
            this.isEdit = true;
            this.params = this.boardToUpdate.apiParams;
            this.tags = this.boardToUpdate.tags;
            this.selectedClasses = this.boardToUpdate.sections;
            this.selectedExamTypes = this.boardToUpdate.examTypes;
            this.isLoading = false;
          }
        })
      }
    });

    this.classService.getAllClasses().subscribe(response => {
      if(response.data && response.success) {
        this.classes = response.data;
        this.isLoading = false;
      }
    });
    
  }

  addTag(form: NgForm) {
    this.tags.push(form.value.tagTitle);
  }

  removeTag(tag: any) {
    const index = this.tags.indexOf(tag, 0);
    if (index > -1) {
      this.tags.splice(index, 1);
    }
  }

  addParam(form: NgForm) {
    this.params.push(form.value.paramTitle);
  }

  removeParam(param: any) {
    const index = this.params.indexOf(param, 0);
    if (index > -1) {
      this.params.splice(index, 1);
    }
  }

  cancel() {
    this.isEdit = false;
    this.router.navigate(["/rs-admin/boards"]);
  }

  addBoard(form: NgForm){
    this.isLoading = true;
    if(form.invalid){
      return;
    };
    this.selectedClasses.forEach(cls => {
      this.selectedCls.push(cls._id);
    });
    if(this.isEdit && this.boardToUpdateId){
      this.boardService.updateBoard(this.boardToUpdateId, form.value.key, form.value.title, form.value.province, form.value.city, this.selectedExamTypes, this.selectedCls, form.value.apiMode, form.value.webUrl, form.value.resultUrl, form.value.apiUrl, form.value.requestType, this.params, this.tags)
      .subscribe(response => {
        if(response) {
          this.isLoading = false;
          this.selectedClasses = [];
          this.selectedExamTypes = [];
          this.tags = [];
          this.params = [];
          this.isEdit = false;
          alert(response.message);
        }
        if(response.success) {
          this.router.navigate(["/rs-admin/boards"]);
        }
      })
    }
    else{
      this.boardService.addBoard(null, form.value.key, form.value.title, form.value.province, form.value.city, this.selectedExamTypes, this.selectedCls, form.value.apiMode, form.value.webUrl, form.value.resultUrl, form.value.apiUrl, form.value.requestType, this.params, this.tags)
      .subscribe(response => {
        if(response) {
          this.isLoading = false;
          this.selectedClasses = [];
          this.selectedExamTypes = [];
          this.tags = [];
          this.params = [];
          alert(response.message);
        }
      });
    };
    form.resetForm();
  }
}
