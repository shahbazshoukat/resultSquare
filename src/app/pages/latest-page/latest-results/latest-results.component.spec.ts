import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestResultsComponent } from './latest-results.component';

describe('LatestResultsComponent', () => {
  let component: LatestResultsComponent;
  let fixture: ComponentFixture<LatestResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
