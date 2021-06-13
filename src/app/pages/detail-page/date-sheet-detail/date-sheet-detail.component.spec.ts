import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSheetDetailComponent } from './date-sheet-detail.component';

describe('DateSheetDetailComponent', () => {
  let component: DateSheetDetailComponent;
  let fixture: ComponentFixture<DateSheetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateSheetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSheetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
