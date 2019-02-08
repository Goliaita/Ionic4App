import { Component, OnInit } from '@angular/core';
import {Events} from '@ionic/angular';
import {AuthService} from '../../service/auth.service';
import {GetService} from '../../service/get.service';
import {Student} from '../../models/Student';
import {LectureCalendar} from '../../models/LectureCalendar';
import {ChatList} from '../../models/ChatList';
import {AngularFirestore} from '@angular/fire/firestore';



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
  private chats: Array<ChatList> = [];

  constructor(private events: Events,
              private authService: AuthService,
              private getService: GetService,
              private fireStore: AngularFirestore) {
    this.userType = this.authService.getLoggedUser('common');
    this.student = this.authService.getLoggedUser('user');
    this.url = this.authService.getToken('image');
    this.getService.findModulesByCourseId(this.student.course.courseId).subscribe(ret =>{
      ret.forEach(module=>{
        this.fireStore.collection('chat').doc('kmrVt4jEZwOltgE9sNvR')
            .collection<ChatList>('privateChat', ref =>
                ref.where('chatId', '==', module.moduleId)
            ).valueChanges().subscribe(chats =>{
              chats.forEach(chat=>{
                this.chats.push(chat);
              });
          this.fireStore.collection('chat').doc('kmrVt4jEZwOltgE9sNvR')
              .collection<ChatList>('privateChat', ref =>
                  ref.where('studentID', '==', this.student.person.personId)
              ).valueChanges().subscribe(ret=>{
                ret.forEach(chat=>{
                  this.chats.push(chat);
                })
          });
        });
      });

    });

  }

  ngOnInit() {

  }

}
