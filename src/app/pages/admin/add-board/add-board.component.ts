import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgForm } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { BoardService } from 'src/app/services/board.service';

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
  

  constructor(private classService: ClassService, private boardService: BoardService) { }

  ngOnInit() {

    this.classService.getAllClasses().subscribe(response => {
      console.log(response);
      if(response.data) {
        this.classes = response.data;
      }
    });
    this.examTypes = [
      {e_id:1, e_type: 'Annual'},
      {e_id:2, e_type: 'Supply'},
      {e_id:3, e_type: 'Test'},
      {e_id:4, e_type: 'Retotal'},
    ];
    this.examTypesSettings = {
      singleSelection: false,
      idField: 'e_id',
      textField: 'e_type',
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
  }
  onClassesSelect(item: any) {
    const cId = item._id;
    this.selectedCls.push(item._id);
  }
  onClassesSelectAll(items: any) {
    items.forEach(item => {
      this.selectedCls.push(item._id);
    });
  }

  onExamTypesSelect(item: any) {
    this.selectedET.push(item.e_id);
  }
  onExamTypesSelectAll(items: any) {
    items.forEach(item => {
      this.selectedET.push(item.e_id);
    });
  }


  addTag(form: NgForm) {
    this.tags.push(form.value.tagTitle);
  }

  addParam(form: NgForm) {
    this.params.push(form.value.paramTitle);
  }

  addBoard(form: NgForm){
    if(form.invalid){
      return;
    }
    this.boardService.addBoard(null, form.value.title, form.value.province, form.value.city, this.selectedET, this.selectedCls, form.value.apiMode, form.value.webUrl, form.value.resultUrl, form.value.apiUrl, form.value.requestType, this.params, this.tags);
    form.resetForm();
  }


}
