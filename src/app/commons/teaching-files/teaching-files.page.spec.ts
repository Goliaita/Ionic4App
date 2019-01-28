import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingFilesPage } from './teaching-files.page';

describe('TeachingFilesPage', () => {
  let component: TeachingFilesPage;
  let fixture: ComponentFixture<TeachingFilesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachingFilesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachingFilesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
