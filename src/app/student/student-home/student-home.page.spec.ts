import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHomePage } from './student-home.page';

describe('StudentHomePage', () => {
  let component: StudentHomePage;
  let fixture: ComponentFixture<StudentHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
