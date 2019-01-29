import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentHomePage } from './student-home.page';
import {TeachingFilesPage} from '../../commons/teaching-files/teaching-files.page';
import {ChatPagePage} from '../../commons/chat-page/chat-page.page';

const routes: Routes = [
  {
    path: '',
    component: StudentHomePage
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentHomePage]
})
export class StudentHomePageModule {}
