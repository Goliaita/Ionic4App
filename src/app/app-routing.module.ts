import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'student-home', loadChildren: './student/student-home/student-home.module#StudentHomePageModule' },
  { path: 'professor-home', loadChildren: './professor/professor-home/professor-home.module#ProfessorHomePageModule' },
  { path: 'chat-page', loadChildren: './commons/chat-page/chat-page.module#ChatPagePageModule' },
  { path: 'teaching-files/:id', loadChildren: './commons/teaching-files/teaching-files.module#TeachingFilesPageModule' },
  { path: 'approval', loadChildren: './approval/approval.module#ApprovalPageModule' }


 // { path: 'chat-list', loadChildren: './chat-list/chat-list.module#ChatListPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
