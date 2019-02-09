import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TeachingFilesPage } from './teaching-files.page';
import { RatingComponent } from './rating/rating.component';

const routes: Routes = [
  {
    path: '',
    component: TeachingFilesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TeachingFilesPage, RatingComponent],
  exports: [RatingComponent]
})
export class TeachingFilesPageModule {}
