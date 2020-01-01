import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import {Location} from '@angular/common';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-enter-rollno',
  templateUrl: './enter-rollno.component.html',
  styleUrls: ['./enter-rollno.component.scss']
})
export class EnterRollNoComponent implements OnInit {

  selectedBoardKey;
  selectedClass;
  selectedYear;
  selectedExamType;
  selectedBoard;
  resultTitle;
  resultData;
  tags = [];
  result = 'NO RESULT FOUND';
  isLoading = false;
  url = '';
  announced = false;
  announceDate = '';
  notAnnouncedAnimOptions: AnimationOptions = {
    path: '/assets/lib/not-announced.json'
  };

  notAnnouncedAnim: AnimationItem;

  constructor(private route: ActivatedRoute, private resultService: ResultService, private _location: Location) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("boardKey")) {
        this.selectedBoardKey = paramMap.get("boardKey");
        this.selectedBoard = this.selectedBoardKey.replace(/-/g, ' ');
      }
      if(paramMap.has("classTitle")) {
        this.selectedClass = paramMap.get("classTitle");
      }
      if(paramMap.has("year")) {
        this.selectedYear = paramMap.get("year");
      }
      if(paramMap.has("examType")) {
        this.selectedExamType = paramMap.get("examType");
        this.getResult();
      }
      this.resultTitle = `${this.selectedBoard} ${this.selectedClass} Class ${this.selectedExamType} Result ${this.selectedYear}`;
    });
  }

  notAnnouncedAnimationCreated(animationItem: AnimationItem): void {

    this.notAnnouncedAnim = animationItem;

  }

  getResult() {
    this.announced = false;
    this.resultService.getResult(this.selectedClass, this.selectedBoardKey, this.selectedYear, this.selectedExamType).subscribe(response => {
      this.resultData = response.data;
      if (this.resultData) {

        this.announced = this.resultData.status;

        if (this.resultData.announceDate && this.resultData.announceDate.day && this.resultData.announceDate.month && this.resultData.announceDate.year) {

          this.announceDate = `${this.resultData.announceDate.day}/${this.resultData.announceDate.month}/${this.resultData.announceDate.year}`;

        }

        this.tags = this.resultData.tags;

        this.url = this.resultData.resultUrl;

      } else {

        console.log('page not found');

      }

    })
  }

}
