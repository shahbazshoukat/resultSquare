import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterRollNoComponent } from './enter-rollno.component';

describe('EnterRollNoComponent', () => {
  let component: EnterRollNoComponent;
  let fixture: ComponentFixture<EnterRollNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterRollNoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterRollNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
