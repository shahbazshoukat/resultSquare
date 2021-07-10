import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPaperDetailComponent } from './model-paper-detail.component';

describe('ModelPaperDetailComponent', () => {
  let component: ModelPaperDetailComponent;
  let fixture: ComponentFixture<ModelPaperDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPaperDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPaperDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
