import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturesRatingComponent } from './lectures-rating.component';

describe('LecturesRatingComponent', () => {
  let component: LecturesRatingComponent;
  let fixture: ComponentFixture<LecturesRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturesRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturesRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
