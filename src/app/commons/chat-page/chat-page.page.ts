import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {Student} from '../../models/Student';
import {Professor} from '../../models/Professor';
import {AuthService} from '../../service/auth.service';
import {Message} from '../../models/Message';
import {ChatList} from '../../models/ChatList';
import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';
import {Module} from '../../models/Module';
import {GetService} from '../../service/get.service';
import {IonContent} from '@ionic/angular';


@Component({
    selector: 'app-chat-page',
    templateUrl: './chat-page.page.html',
    styleUrls: ['./chat-page.page.scss'],
})
export class ChatPagePage implements OnInit {

    @ViewChild(IonContent) content: IonContent;

    userType: any;

    student: Student;

    professor: Professor;

    messages: Message[] = null;

    chatData: ChatList;
    chatList: Array<ChatList>;

    pageName: string;
    chatId: string;
    senderType: string;
    message:string;

    courseModuleList: Array<Module> = null;
    studentModuleList: Array<Student> = null;

    professorModule: Module;

    constructor(private route: ActivatedRoute,
                private chatHistory: AngularFirestore,
                private authService: AuthService,
                private getService: GetService,
                private router: Router) {
        this.userType = this.authService.getLoggedUser('common');
        this.chatList = this.authService.getLoggedUser('chatList');
        if(this.userType.type == 'student') {
            this.student = this.authService.getLoggedUser('user');
            this.senderType = 'Student';
        }else {
            this.professor = this.authService.getLoggedUser('user');
            this.senderType = 'Professor';
        }

    }

    ngOnInit() {
        this.chatId = this.route.snapshot.paramMap.get('chatId');
        console.log(this.chatId);
        if(this.chatId == 'newChat'){
            this.pageName = 'Select new Chat';
            console.log(this.student);
            this.createNewChat();
        }else{
            this.existingChat();
        }
    }



    existingChat(){
        this.chatList.forEach(chat =>{
            if(chat.chatId == this.chatId){
                this.chatData = chat;
            }
        });
        console.log(this.chatData == null);
        if(this.chatData == null){
            this.route.queryParams.forEach(param=>{
                console.log(param.chatName);
                this.chatData = param;
                this.loadChat();
            });
        }else{
            this.loadChat();
        }

    }

    loadChat(){
        if(this.chatData.chatType == 'Public'){
            this.chatHistory.collection('modules').doc(''+this.chatId).collection('chat').
            valueChanges().subscribe(messages=>{
                this.messages = messages;
                this.pageName = this.chatData.chatName;
                if(this.messages.length == 1) {
                    this.messages[0].hours = new Date(this.messages[0].date.toDate()).toLocaleTimeString();
                }else {
                    this.messages.sort((a, b) => {
                        a.hours = new Date(a.date.toDate()).toLocaleTimeString();
                        b.hours = new Date(b.date.toDate()).toLocaleTimeString();
                        return new Date(a.date.toDate()).getTime() - new Date(b.date.toDate()).getTime();

                    });
                }
            });
        }else {
            this.chatHistory.collection('privateChat').doc('Ei72O25Dn5EKdRPvmUSb')
                .collection('' + this.chatId).valueChanges().subscribe(messages => {
                this.messages = messages;
                if (this.userType.type == 'student') {
                    this.pageName = this.chatData.professorName;
                } else {
                    this.pageName = this.chatData.studentName;
                }
                if (this.messages.length == 1) {
                    this.messages[0].hours = new Date(this.messages[0].date.toDate()).toLocaleTimeString();
                } else {
                    this.messages.sort((a, b) => {
                        a.hours = new Date(a.date.toDate()).toLocaleTimeString();
                        b.hours = new Date(b.date.toDate()).toLocaleTimeString();
                        return new Date(a.date.toDate()).getTime() - new Date(b.date.toDate()).getTime();

                    });
                }

                this.content.scrollToBottom(1000);
            });
        }
    }

    createNewChat(){
        if(this.userType.type == 'student'){
            this.getService.findModulesByCourseId(this.student.course.courseId).subscribe(modules => {
                this.courseModuleList = null;
                let buff = modules;
                let index = 0;
                let indexBuff = [];
                modules.forEach(module => {
                    this.chatList.forEach(key => {
                        if (key.studentId == this.student.person.personId &&
                            key.professorId == module.professor.person.personId){
                            indexBuff.push(index);
                        }
                    });
                    index++;
                });
                for(let i = indexBuff.length-1; i >= 0; i--){
                    buff.splice(indexBuff[i], 1);
                }
                this.courseModuleList = buff;
            });
        }else{
            this.studentModuleList = null;
            this.getService.findAllStudentByModule(this.professorModule.course.courseId).subscribe(students => {

                let buff = students;
                let index = 0;
                let indexBuff = [];
                students.forEach(student => {
                    this.chatList.forEach(key => {
                        if (key.professorId == this.professor.person.personId && key.studentId == student.studentId) {
                            indexBuff.push(index);
                        }
                    });
                    index++;
                });
                for(let i = indexBuff.length-1; i >= 0; i--){
                    buff.splice(indexBuff[i], 1);
                }
                this.studentModuleList = buff;

            });
        }
    }

    sendMessage() {
        if (this.message != '') {
            let message: Message = {};
            if (this.chatData.chatType == 'Public') {
                console.log(this.chatData);
                if (this.userType.type == 'student') {
                    message.studentId = this.student.studentId;
                    message.studentName = this.student.person.firstName + ' ' + this.student.person.lastName;
                    message.senderName = message.studentName;
                } else {
                    message.professorId = this.professor.professorId;
                    message.professorName = this.professor.person.firstName + ' ' + this.professor.person.lastName;
                    message.senderName = message.professorName;
                }
                console.log(message.senderName);
                message.senderType = this.senderType;
                message.message = this.message;
                message.date = Timestamp.fromDate(new Date());
                message.chatId = this.chatData.chatId;
                message.chatType = 'Public';
                this.chatHistory.collection('modules').doc(''+this.chatId)
                    .collection('chat').add(message).then();

            } else {
                message.chatType = 'Private';
                message.studentId = this.chatData.studentId;
                message.studentName = this.chatData.studentName;
                message.professorId = this.chatData.professorId;
                message.professorName = this.chatData.professorName;
                if(this.userType.type == 'student'){
                    message.senderName = this.chatData.studentName;
                }else{
                    message.senderName = this.chatData.professorName;
                }
                message.senderType = this.senderType;
                message.message = this.message;
                message.date = Timestamp.fromDate(new Date());
                message.chatId = this.chatData.chatId;
                this.chatHistory.collection('privateChat').doc('Ei72O25Dn5EKdRPvmUSb')
                    .collection('' + this.chatData.chatId).add(message).then();
            }

            this.message = '';

        }

    }

    createChat(professor?: Professor, student?: Student){
        let chat: ChatList = {
            studentId:  0,
            studentName: '',
            professorId: 0,
            professorName: '',
            chatId: '',
            chatName: '',
            chatType:''
        };

        if(this.userType.type == 'student'){
            chat.chatName = this.student.person.firstName + ' - Professor ' + professor.person.firstName;
            chat.studentId = this.student.person.personId;
            chat.studentName = this.student.person.firstName + ' ' + this.student.person.lastName;
            chat.professorName = professor.person.firstName + ' ' + professor.person.lastName;
            chat.professorId = professor.person.personId;
        }else{
            chat.chatName = student.person.firstName + ' - Professor ' + this.professor.person.firstName;
            chat.professorId = this.professor.person.personId;
            chat.professorName = this.professor.person.firstName + ' ' + this.professor.person.lastName;
            chat.studentId = student.person.personId;
            chat.studentName = student.person.firstName + ' ' + student.person.lastName;
        }
        chat.chatType = 'Private';
        this.chatId = this.chatHistory.createId();
        chat.chatId = this.chatId;
        this.chatHistory.collection('chat').doc('kmrVt4jEZwOltgE9sNvR').
        collection('privateChat').add(chat).then(then=>{
            console.log(then);
        });

        this.router.navigate(['chat-page/', this.chatId], {queryParams: chat});
    }

}

