import { Component, OnInit, Input } from '@angular/core';
import { Calendar } from '../../../models/LectureCalendar';
import { LectureRating } from '../../../models/LectureRating';
import { AuthService } from '../../../service/auth.service';
import { Student } from '../../../models/Student';
import { PostService } from '../../../service/post.service';
import { GetService } from '../../../service/get.service';
import { Observable } from 'rxjs';
import { Module } from '../../../models/Module';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-lectures-rating',
  templateUrl: './lectures-rating.component.html',
  styleUrls: ['./lectures-rating.component.scss']
})
export class LecturesRatingComponent implements OnInit {

  @Input() lecture: Calendar;
  @Input() selectedModule: Module;
  rate = 2;
  rated = true;
  lectureRating: LectureRating = {};
  student: Student;
  calendar: Calendar = {
    calendarDate: null
  };
  isenabled = false;
  note: string = null;

  constructor(private authService: AuthService,
              private postService: PostService,
              private getService: GetService,
              private firestore: AngularFirestore) {
    this.student = this.authService.getLoggedUser('user');
   }

  ngOnInit() {
    this.getService.getRatingByStudentAndLecture(this.student.studentId, this.lecture.calendarId).
    subscribe(rating => {
      if (rating != null) {
        this.lectureRating = rating;
        this.rated = true;
      } else {
        this.rated = false;
      }
    });
  }

  getRating() {
    this.getService.getRatingByStudentAndLecture(this.student.studentId, this.lecture.calendarId).
    subscribe(rating => {
      if (rating != null) {
        this.lectureRating = rating;
        this.rated = true;
      } else {
        this.rated = false;
      }
    });
  }

  onSubmit() {
    this.lectureRating.rate = String(this.rate);
    this.lectureRating.student = this.student;
    this.lectureRating.calendar = this.lecture;
    this.lectureRating.calendar.calendarDate.startDate = null;
    this.lectureRating.calendar.calendarDate.endDate = null;
    this.lectureRating.calendar.roomEquipment = null;
    this.lectureRating.date = new Date();
    this.lectureRating.note = this.note;
     this.postService.postLectureRating(this.lectureRating).subscribe( rating => {
      if (rating != null) {
        console.log(this.lectureRating);
        this.firestore.collection('tickets').doc(String(this.selectedModule.professor.person.personId))
        .collection('ratings').add(
          {
            file: this.lecture.calendarDate.date,
            rate: this.rate + ' - ' + this.lectureRating.note
          });
          this.getRating();
      }
    });
  }
}
