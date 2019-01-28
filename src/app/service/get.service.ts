import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Module} from '../models/Module';
import {Observable} from 'rxjs';
import {Student} from '../models/Student';
import {Login} from '../models/Login';
import {timeout, catchError} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GetService {

  IP = '10.0.211.171';
  //loginUrl: string = 'http://localhost:8080/SpringApp/login/';
  loginUrl: string = 'http://' + this.IP + ':8080/SpringApp/login/';
  findCourseByProfessorIdUrl: string = 'http://' + this.IP + ':8080/SpringApp/professor/findModuleByProfessorId/';
  findAllStudentByCourseUrl: string = 'http://' + this.IP + ':8080/SpringApp/student/findAll/';
  findProfessorsByCourseIdUrl: string = 'http://' + this.IP + ':8080/SpringApp/module/findAll/';

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

  findCourseByProfessorId(id: number): Observable<Module>{
    return this.http.get<Module>(this.findCourseByProfessorIdUrl + id);
  }

  findAllStudentByModule(module: number): Observable<Array<Student>>{
    return this.http.get<Array<Student>>(this.findAllStudentByCourseUrl + module);
  }

  findProfessorsByCourseId(courseId: number): Observable<Array<Module>>{
    return this.http.get<Array<Module>>(this.findProfessorsByCourseIdUrl + courseId);
  }


}
