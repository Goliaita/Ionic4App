import { Component } from '@angular/core';
import {Events, ToastController} from '@ionic/angular';
import {Professor} from '../models/Professor';
import {Student} from '../models/Student';
import {GetService} from '../service/get.service';
import {AngularFireAuth} from "angularfire2/auth";
import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string;
  password: string;

  showPass: boolean = false;
  type: string = 'password';

  professor: Professor;
  student: Student;

  userCredentials: UserCredential;

  constructor(private getService: GetService,
              private authFire: AngularFireAuth,
              private toastCtrl: ToastController,
              private router: Router,
              private authService: AuthService,
              private fireStore: AngularFireStorage) { }

  submit(){
    console.log(this.email + ' ' + this.password);
    let user = {
      email: this.email,
      password: this.password
    };

    this.authFire.auth.signInWithEmailAndPassword(user.email, user.password).then(ret=>{
      console.log(ret);
      this.userCredentials = ret;

      this.getService.login(user).subscribe(loggedUser=>{
        if(loggedUser.professor != null){
          console.log("loggato");
          this.professor = loggedUser.professor;
          this.authService.sendToken(this.professor, 'user');
          this.authService.sendToken('professor', 'token');
          this.fireStore.storage.ref('/images/' + this.professor.person.personId + '/firebase-ico.png').
          getDownloadURL().then(result =>{
            this.authService.sendToken(result, 'image');
          });
          this.router.navigate(['professor-home']);
          console.log(loggedUser.professor);
        }else if (loggedUser.student != null){
          this.student = loggedUser.student;
          this.authService.sendToken(this.student, 'user');
          this.authService.sendToken('student', 'token');
          this.fireStore.storage.ref('/images/' + this.student.person.personId + '/firebase-ico.png').
          getDownloadURL().then(result =>{
            this.authService.sendToken(result, 'image');
          });
          this.router.navigate(['student-home']);
          console.log(loggedUser.student);
        }else{
          if(loggedUser == '0'){
            this.presentToast('timeout');
          }
        }
      }, err =>{
        console.log('prova');
        console.log(err);
      });
    }).catch(err=>{
      console.log(err);
      this.presentToast(err.code);
    });
  }

  showPassword(){
    this.showPass = !this.showPass;
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  presentToast(message: string) {
    let text = '';

    console.log(message);
    switch (message) {
      case 'auth/argument-error':
        text = 'Invalid email please try again';
        break;

      case 'auth/wrong-password':
        text = 'Wrong password please try again';
        break;

      case 'auth/invalid-email':
        text = 'Invalid email please try again';
        break;

      case 'auth/user-not-found':
        text = 'User not found please try again';
        break;

      case 'network-request-failed':
        text = 'network unavailable';
        break;

      case 'timeout':
        text = 'No connection to server found please try again later';
        break;

      default:
        text = 'An error has occurred please try again';
        break;
    }
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'middle'
    });
  }
}
