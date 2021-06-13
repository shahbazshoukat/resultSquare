import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDateSheetsComponent } from './board-date-sheets.component';

describe('BoardDateSheetsComponent', () => {
  let component: BoardDateSheetsComponent;
  let fixture: ComponentFixture<BoardDateSheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardDateSheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDateSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
