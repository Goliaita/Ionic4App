import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorHomePage } from './professor-home.page';

describe('ProfessorHomePage', () => {
  let component: ProfessorHomePage;
  let fixture: ComponentFixture<ProfessorHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
