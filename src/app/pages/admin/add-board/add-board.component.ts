import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.scss']
})
export class AddBoardComponent implements OnInit {

  examTypes = [];
  selectedExamTypes = [];
  examTypesSettings: IDropdownSettings = {};
  classes = [];
  selectedClasses = [];
  classesSettings: IDropdownSettings = {};
  

  constructor() { }

  ngOnInit() {
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
    this.classes = [
      { c_id: 1, class: '5th' },
      { c_id: 2, class: '8th' },
      { c_id: 3, class: '9th' },
      { c_id: 4, class: '10th' },
      { c_id: 5, class: '11th' }
    ];
   
    this.classesSettings = {
      singleSelection: false,
      idField: 'c_id',
      textField: 'class',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
