import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestDateSheetsComponent } from './latest-date-sheets.component';

describe('LatestDateSheetsComponent', () => {
  let component: LatestDateSheetsComponent;
  let fixture: ComponentFixture<LatestDateSheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestDateSheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestDateSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
