import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDetailPageComponent } from './result-detail-page.component';

describe('ResultPageComponent', () => {
  let component: ResultDetailPageComponent;
  let fixture: ComponentFixture<ResultDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
