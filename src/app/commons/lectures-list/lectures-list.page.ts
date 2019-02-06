import { Component, OnInit } from '@angular/core';
import { GetService } from '../../service/get.service';
import { Calendar } from '../../models/LectureCalendar';
import { AuthService } from '../../service/auth.service';
import { Professor } from '../../models/Professor';
import { Module } from '../../models/Module';
import { Student } from '../../models/Student';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-lectures-list',
  templateUrl: './lectures-list.page.html',
  styleUrls: ['./lectures-list.page.scss'],
})
export class LecturesListPage implements OnInit {

  lectures: Array<Calendar>;
  modules: Array<Module>;
  selectedModule: Module;
  studentUser = false;
  showRateId: number = null;

  constructor(private getService: GetService,
    private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.getToken('token') == '"student"') {
      const student: Student = this.authService.getLoggedUser('user');
      console.log(student);
      this.studentUser = true;
      this.getService.getModuleByCourse(student.course.courseId).subscribe( modules => {
        this.modules = modules;
        console.log(this.modules);
      });

    } else {
      const prof: Professor = this.authService.getLoggedUser('user');
      console.log(prof);
      this.getService.findModuleByProf(prof.professorId).subscribe( modules => {
        this.modules = modules;
        console.log(this.modules);
      });
    }

    // se l'utente loggato è un professore restituisce i suoi moduli
    // se l'utente loggato è uno studente restituisce i moduli del corso a cui è iscritto
    // relativi all'anno corrente e al semestre corrente magari...
  }

  onSelectModule(module: Module) {
    console.log(module);
    this.getService.getCalendaByModule(this.selectedModule.moduleId).subscribe(lectures => {
      this.lectures = lectures;
      console.log(this.lectures);
      if (this.lectures != null) {
      this.lectures.sort((val1, val2) => new Date(val2.date).valueOf() - new Date(val1.date).valueOf());
      }
    });
  }

  onRate(calendarId) {
    if (this.showRateId === calendarId) {
      this.showRateId = null;
    } else {
      this.showRateId = calendarId;
    }
  }

}
