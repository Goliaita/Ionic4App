import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'student-home', loadChildren: './student/student-home/student-home.module#StudentHomePageModule' },
  { path: 'professor-home', loadChildren: './professor/professor-home/professor-home.module#ProfessorHomePageModule' },
  { path: 'chat-list', loadChildren: './chat-list/chat-list.module#ChatListPageModule'},
  { path: 'chat-page/:chatId', loadChildren: './commons/chat-page/chat-page.module#ChatPagePageModule'},
  { path: 'teaching-files', loadChildren: './commons/teaching-files/teaching-files.module#TeachingFilesPageModule' },
  { path: 'lectures-list', loadChildren: './commons/lectures-list/lectures-list.module#LecturesListPageModule' },
  { path: 'google-maps', loadChildren: './commons/google-maps/google-maps.module#GoogleMapsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
