import {Component, OnInit} from '@angular/core';
import {Message} from '../models/Message';
import {Module} from '../models/Module';
import {Student} from '../models/Student';
import {ChatList} from '../models/ChatList';
import {Professor} from '../models/Professor';
import {ModalController, Platform, ToastController} from '@ionic/angular';
import {GetService} from '../service/get.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
/*import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';*/

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {

  menu: boolean = false;

  lastOperation: string;

  messages: Message[] = null;
  professorModule: Module;
  message: string = '';

  courseModuleList: Array<Module> = null;
  studentModuleList: Array<Student> = null;

  pageName = '';
  chatList: ChatList[] = [];
  senderType: string;
  selectedChat: ChatList;
  userType: any;
  user: any;

  userParam: any;
  student: Student;
  professor: Professor;

  constructor(private chatHistory: AngularFirestore,
              private getService: GetService,
              private toastCtrl: ToastController,
              private authService: AuthService,
              private router: Router) {
    this.userType = this.authService.getLoggedUser('common');
    if (this.userType.type == 'student') {
      this.student = this.authService.getLoggedUser('user');
    } else {
      this.professor = this.authService.getLoggedUser('user');
    }
  }

  ngOnInit() {
    if (this.userType.type == 'professor') {
      this.getService.findCourseByProfessorId(this.professor.professorId).subscribe(module => {
        console.log(module);
        this.professorModule = module;
        this.senderType = this.userType.type;
        console.log(this.userType.type);
        this.retrieveAllChat(this.userType.type);
      });
    } else {
      this.senderType = this.userType.type;
      this.retrieveAllChat(this.userType.type);
    }
  }

  retrieveAllChat(userType: string) {
    this.chatList = [];
    this.chatHistory.collection('chat').doc('kmrVt4jEZwOltgE9sNvR').collection<ChatList>('privateChat').valueChanges().subscribe(chats => {
      let indexBuff = [];
      let index = 0;
      let buff = chats;
      if (userType == 'student') {
        buff.forEach(chat => {
          if (chat.studentId != this.student.person.personId && chat.chatType == 'Private') {
            indexBuff.push(index);
          }
          if (chat.courseId != this.student.course.courseId && chat.chatType == 'Public') {
            indexBuff.push(index);
          }
          index++;
        });

      } else {
        buff.forEach(chat => {
          if (chat.professorId != this.professor.person.personId && chat.chatType == 'Private') {
            indexBuff.push(index);
          }
          if (chat.moduleId != this.professorModule.moduleId && chat.chatType == 'Public') {
            indexBuff.push(index);
          }
          index++;
        });
      }
      for (let i = indexBuff.length - 1; i >= 0; i--) {
        buff.splice(indexBuff[i], 1);
      }

      this.chatList = buff;
      this.authService.sendToken(this.chatList, 'chatList');

    });

  }

  selectChat(chat: ChatList) {

    this.selectedChat = chat;

    this.router.navigate(['chat-page/' + this.selectedChat.chatId]);

  }

  showToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'middle'
    });

  }

  findPeople() {
    this.router.navigate(['chat-page/' + 'newChat']);
  }
}
