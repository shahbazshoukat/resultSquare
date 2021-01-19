import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToDoComponent } from './how-to-do.component';

describe('HowToDoComponent', () => {
  let component: HowToDoComponent;
  let fixture: ComponentFixture<HowToDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
