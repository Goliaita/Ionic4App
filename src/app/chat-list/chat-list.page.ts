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

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {

  messages: Message[] = null;
  professorModules: Array<Module>;

  courseModuleList: Array<Module> = null;
  studentModuleList: Array<Student> = null;

  chatList: ChatList[] = [];
  senderType: string;
  selectedChat: ChatList;
  userType: any;
  user: any;

  chats: Array<ChatList> = [];

  student: Student;
  professor: Professor;

  constructor(private chatHistory: AngularFirestore,
              private getService: GetService,
              private toastCtrl: ToastController,
              private authService: AuthService,
              private router: Router,
              private fireStore: AngularFirestore) {
    this.userType = this.authService.getLoggedUser('common');
    if (this.userType.type == 'student') {
      this.student = this.authService.getLoggedUser('user');
    } else {
      this.professor = this.authService.getLoggedUser('user');
    }
  }

  ngOnInit() {
    if (this.userType.type == 'professor') {

      this.senderType = this.userType.type;
      this.retrieveAllChat();

    } else {

      this.senderType = this.userType.type;
      this.retrieveAllChat();
    }
  }

  retrieveAllChat() {
    if(this.userType.type == 'student'){
      this.getService.findModulesByCourseId(this.student.course.courseId).subscribe(ret =>{
        ret.forEach(module=>{
          console.log(module.moduleId);
          this.fireStore.collection('chat').doc('kmrVt4jEZwOltgE9sNvR')
              .collection<ChatList>('privateChat', ref =>
                  ref.where('chatId', '==', module.moduleId)
              ).valueChanges().subscribe(chats =>{
            chats.forEach(chat=>{
              this.chatList.push(chat);
            });
            this.authService.sendToken(this.chatList, 'chatList');
          });
        });
        this.fireStore.collection('chat').doc('kmrVt4jEZwOltgE9sNvR')
            .collection<ChatList>('privateChat', ref =>
                ref.where('studentId', '==', this.student.person.personId)
            ).valueChanges().subscribe(ret=>{
          ret.forEach(chat=>{
            this.chatList.push(chat);
          });
          this.authService.sendToken(this.chatList, 'chatList');
        });
      });
    }else{
      this.getService.findModuleByProf(this.professor.professorId).subscribe(ret =>{
        ret.forEach(module=>{
          this.fireStore.collection('chat').doc('kmrVt4jEZwOltgE9sNvR')
              .collection<ChatList>('privateChat', ref =>
                  ref.where('chatId', '==', module.moduleId)
              ).valueChanges().subscribe(chats =>{
            chats.forEach(chat=>{
              this.chatList.push(chat);
            });
            this.authService.sendToken(this.chatList, 'chatList');
          });
        });
        this.fireStore.collection('chat').doc('kmrVt4jEZwOltgE9sNvR')
            .collection<ChatList>('privateChat', ref =>
                ref.where('professorId', '==', this.professor.person.personId)
            ).valueChanges().subscribe(ret=>{
          ret.forEach(chat=>{
            this.chatList.push(chat);
          });
          this.authService.sendToken(this.chatList, 'chatList');
        });
      });
    }
  }

  selectChat(chat: ChatList) {

    this.selectedChat = chat;

    this.router.navigate(['chat-page/' + this.selectedChat.chatId]).then();

  }

  showToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'middle'
    });

  }

  findPeople() {
    this.router.navigate(['chat-page/' + 'newChat']).then();
  }
}
