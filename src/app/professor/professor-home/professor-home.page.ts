import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Professor } from '../../models/Professor';
import { GetService } from '../../service/get.service';
import { Module } from '../../models/Module';
import { Calendar } from '../../models/LectureCalendar';
import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { FcmService } from '../../service/fcm.service';
import {Router} from '@angular/router';
import {Room} from '../../models/Room';

@Component({
  selector: 'app-professor-home',
  templateUrl: './professor-home.page.html',
  styleUrls: ['./professor-home.page.scss'],
})
export class ProfessorHomePage implements OnInit {

  prof: Professor;
  calendars: Array<Calendar> = [];
  dd = this.datePipe.transform(new Date(), 'MM-dd-yyyy');

  constructor(private authService: AuthService,
    private getService: GetService,
    private datePipe: DatePipe,
    private router: Router,
    private fcm: FcmService) {
    this.prof = this.authService.getLoggedUser('user');
    console.log(this.prof);
  }


  ngOnInit() {
    this.loadLectures();
    this.fcm.subscribeNotifications(this.prof.person.personId);
    this.fcm.subscribeToTopic('ticket' + this.prof.person.personId);
    this.fcm.subscribeToTopic('j9WiyTcLy7g7i0qRZcSH');
    this.getService.findModuleByProf(this.prof.professorId).subscribe(modules => {
      modules.forEach(module => {
        this.fcm.subscribeToTopic('module' + module.moduleId);
      });
    });
  }

  loadLectures() {
    this.getService.findCalendarByProfAndDate(this.prof.professorId, this.dd).subscribe(async calendars => {
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

  openMaps(room: Room){
    console.log(room.location);
    this.router.navigate(['/google-maps'], {queryParams:{selectedRoom: JSON.stringify(room)}}).then();
  }

}
