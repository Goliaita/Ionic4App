import { Component, OnInit } from '@angular/core';
import {Events} from '@ionic/angular';
import {AuthService} from '../../service/auth.service';
import {GetService} from '../../service/get.service';
import {Student} from '../../models/Student';
import {AngularFireStorage} from '@angular/fire/storage';
import {LectureCalendar} from '../../models/LectureCalendar';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.page.html',
  styleUrls: ['./student-home.page.scss'],
})
export class StudentHomePage implements OnInit {

  student: Student;
  url: string;
  private userType: any;
  private calendar: Array<LectureCalendar>;

  constructor(private events: Events,
              private authService: AuthService,
              private getService: GetService,
              private fireStore: AngularFireStorage) {
    this.userType = this.authService.getLoggedUser('common');
    this.student = this.authService.getLoggedUser('user');
    this.url = this.authService.getToken('image');
  }

  ngOnInit() {

  }

}
