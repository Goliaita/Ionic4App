import { Component, OnInit } from '@angular/core';
import {Events} from '@ionic/angular';
import {AuthService} from '../../service/auth.service';
import {GetService} from '../../service/get.service';
import {Student} from '../../models/Student';
import {AngularFireStorage} from '@angular/fire/storage';
import { Calendar } from '../../models/LectureCalendar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.page.html',
  styleUrls: ['./student-home.page.scss'],
})
export class StudentHomePage implements OnInit {

  student: Student;
  url: string;
  calendars: Array<Calendar> = [];
  dd = this.datePipe.transform(new Date(), 'MM-dd-yyyy');

  constructor(private events: Events,
              private authService: AuthService,
              private getService: GetService,
              private fireStore: AngularFireStorage,
              private datePipe: DatePipe) {
    this.student = this.authService.getLoggedUser('user');
    this.url = this.authService.getToken('image');
    let user = {
      firstName: this.student.person.firstName,
      lastName: this.student.person.lastName,
      url: this.url,
      type: 'student'
    };
    this.events.publish('parsing:data', user);
    console.log(this.student);
  }

  ngOnInit() {
    this.loadLectures();
  }

  loadLectures() {
    this.getService.findCalendarByStudentAndDate(this.student.course.courseId, this.student.year, this.dd).subscribe(async calendars => {
      this.calendars = calendars;
      if (calendars != null) {
        await this.calendars.sort(function (a, b) {
          return a.startTime.localeCompare(b.startTime);
        });
      }
      await console.log(this.calendars);
    });
  }

  next() {
    const day = new Date(this.dd);
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    this.dd = this.datePipe.transform(nextDay, 'MM-dd-yyyy');
    this.loadLectures();
  }

  prev() {
    const day = new Date(this.dd);
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() - 1);
    this.dd = this.datePipe.transform(nextDay, 'MM-dd-yyyy');
    this.loadLectures();
  }

}
