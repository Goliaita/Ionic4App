import { Component, OnInit, Input } from '@angular/core';
import { Calendar } from '../../../models/LectureCalendar';
import { LectureRating } from '../../../models/LectureRating';
import { AuthService } from '../../../service/auth.service';
import { Student } from '../../../models/Student';
import { PostService } from '../../../service/post.service';
import { GetService } from '../../../service/get.service';

@Component({
  selector: 'app-lectures-rating',
  templateUrl: './lectures-rating.component.html',
  styleUrls: ['./lectures-rating.component.scss']
})
export class LecturesRatingComponent implements OnInit {

  @Input() lecture: Calendar;
  rate = 2;
  rated = false;
  lectureRating: LectureRating = {};
  student: Student;
  calendar: Calendar = {};
  isenabled = false;
  note: string = null;

  constructor(private authService: AuthService,
              private postService: PostService,
              private getService: GetService) {
    this.student = this.authService.getLoggedUser('user');
   }

  ngOnInit() {
    this.getRating();
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
    this.lectureRating.calendar.startDate = null;
    this.lectureRating.calendar.endDate = null;
    this.lectureRating.calendar.roomEquipment = null;
    this.lectureRating.date = new Date();
    this.lectureRating.note = this.note;
     this.postService.postLectureRating(this.lectureRating).subscribe( rating => {
      if (rating != null) {
        console.log(this.lectureRating);
      }
    });
  }
}
