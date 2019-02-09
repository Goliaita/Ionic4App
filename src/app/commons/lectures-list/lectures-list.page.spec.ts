import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturesListPage } from './lectures-list.page';

describe('LecturesListPage', () => {
  let component: LecturesListPage;
  let fixture: ComponentFixture<LecturesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturesListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
