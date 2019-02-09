import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Module} from '../models/Module';
import {Observable} from 'rxjs';
import {Student} from '../models/Student';
import {Login} from '../models/Login';
import {timeout, catchError} from 'rxjs/operators';
import { TeachingMaterial } from '../models/TeachingMaterial';
import { TmRating } from '../models/TmRating';
import { Calendar } from '../models/LectureCalendar';
import { LectureRating } from '../models/LectureRating';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GetService {

  //IP = 'localhost';
  IP = '192.168.1.4';

  loginUrl: string = 'http://' + this.IP + ':8080/SpringApp/login/';
  findCourseByProfessorIdUrl: string = 'http://' + this.IP + ':8080/SpringApp/professor/findModuleByProfessorId/';
  findAllStudentByCourseUrl: string = 'http://' + this.IP + ':8080/SpringApp/student/findAll/';
  findModulesByCourseIdUrl: string = 'http://' + this.IP + ':8080/SpringApp/module/findAll/';
  findModuleByProfUrl: string = 'http://' + this.IP + ':8080/SpringApp/module/findByProf/';

  findFileByModuleUrl: string = 'http://' + this.IP + ':8080/SpringApp/teachingMaterial/findByModule/';
  downloadFileUrl: string = 'http://' + this.IP + ':8080/SpringApp/teachingMaterial/downloadFile/';
  findTRByStudentAndTMUrl: string = 'http://' + this.IP + ':8080/SpringApp/tmRating/findByStudentAndTM/';
  findRatingByTMIdUrl: string = 'http://' + this.IP + ':8080/SpringApp/tmRating/findByTmId/';
  getCalendarAllUrl: string = 'http://' + this.IP + ':8080/SpringApp/calendar/findAll';
  getCalendarByModuleUrl: string = 'http://' + this.IP + ':8080/SpringApp/calendar/findByModuleId/';
  getModuleByCourseUrl: string = 'http://' + this.IP + ':8080/SpringApp/module/findAll/';
  getRatingByStudentAndLectureUrl: string = 'http://' + this.IP + ':8080/SpringApp/lectureRating/findByStudentAndLecture/';
  findCalendarByProAndDatefUrl: string = 'http://' + this.IP + ':8080/SpringApp/calendar/findByProfessorAndDate/';
  findCalendarByStudentAndDateUrl: string = 'http://' + this.IP + ':8080/SpringApp/calendar/findByStudentAndDate/';

  constructor(public http: HttpClient) {
    console.log('Hello GetProvider Provider');
  }

  login(user: Login): Observable<any>{
    return this.http.get<any>(this.loginUrl + user.email + '/' + user.password).pipe(
        timeout(5000),
        catchError(e=>{
          console.log(e);
          return '0';
        })
    );
  }

  findCourseByProfessorId(id: number): Observable<Module> {
    return this.http.get<Module>(this.findCourseByProfessorIdUrl + id);
  }

  findAllStudentByModule(module: number): Observable<Array<Student>> {
    return this.http.get<Array<Student>>(this.findAllStudentByCourseUrl + module);
  }

  findModulesByCourseId(courseId: number): Observable<Array<Module>> {
    return this.http.get<Array<Module>>(this.findModulesByCourseIdUrl + courseId);
  }

  findModuleByProf(professorId: number): Observable<Array<Module>> {
    return this.http.get<Array<Module>>(this.findModuleByProfUrl + professorId);
  }

  findFileByModule(moduleId: number): Observable<Array<TeachingMaterial>> {
    return this.http.get<Array<TeachingMaterial>>(this.findFileByModuleUrl + moduleId);
  }

  downloadFile(fileId: number) {
    return this.downloadFileUrl + fileId;
  }

  findTRByStudentAndTM(studentId: number, teachingMaterialId: number): Observable<TmRating> {
    return this.http.get<TmRating>(this.findTRByStudentAndTMUrl + studentId + '/' + teachingMaterialId);
  }
  findRatingByTMId(ratingId: number): Observable<Array<TmRating>> {
    return this.http.get<Array<TmRating>>(this.findRatingByTMIdUrl + ratingId);
  }

  getCalendarAll(): Observable<Array<Calendar>> {
    return this.http.get<Array<Calendar>>(this.getCalendarAllUrl);
  }

  getCalendaByModule(moduleId: number): Observable<Array<Calendar>> {
    return this.http.get<Array<Calendar>>(this.getCalendarByModuleUrl + moduleId);
  }

  getModuleByCourse(courseId: number): Observable<Array<Module>> {
    return this.http.get<Array<Module>>(this.getModuleByCourseUrl + courseId);
  }

  getRatingByStudentAndLecture(studentId: number, calendarId: number): Observable<LectureRating> {
    return this.http.get<LectureRating>(this.getRatingByStudentAndLectureUrl + studentId + '/' + calendarId);
  }

  findCalendarByProfAndDate(profId: number, date: string): Observable<Array<Calendar>> {
    return this.http.get<Array<Calendar>>(this.findCalendarByProAndDatefUrl + profId + '/' + date);
  }

  findCalendarByStudentAndDate(studentId: number, year: number, date: string): Observable<Array<Calendar>> {
    return this.http.get<Array<Calendar>>(this.findCalendarByStudentAndDateUrl +
      studentId + '/' + year + '/' + date);
  }
}
