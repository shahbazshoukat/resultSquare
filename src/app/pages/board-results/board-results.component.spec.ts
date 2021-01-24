import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardResultsComponent } from './board-results.component';

describe('BoardResultsComponent', () => {
  let component: BoardResultsComponent;
  let fixture: ComponentFixture<BoardResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
