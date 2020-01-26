import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSubClassComponent } from './select-sub-class.component';

describe('SelectSubClassComponent', () => {
  let component: SelectSubClassComponent;
  let fixture: ComponentFixture<SelectSubClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSubClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSubClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
