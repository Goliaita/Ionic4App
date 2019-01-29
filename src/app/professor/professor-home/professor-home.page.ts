import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Professor } from '../../models/Professor';
import { GetService } from '../../service/get.service';
import { Module } from '../../models/Module';

@Component({
  selector: 'app-professor-home',
  templateUrl: './professor-home.page.html',
  styleUrls: ['./professor-home.page.scss'],
})
export class ProfessorHomePage implements OnInit {

  professor: Professor = null;
  modules: Array<Module> = [];
  selectedModule: Module = null;

  constructor(private authService: AuthService,
              private getService: GetService) { }

  ngOnInit() {
    this.professor = this.authService.getLoggedUser('user');
    this.getService.findModuleByProf(this.professor.professorId).subscribe(modules => {
      this.modules = modules;
    });
  }

  customActionSheetOptions: any = {
    header: 'Module',
    //subHeader: 'Select Module'
  };

  onSelectModule(){
    console.log(this.selectedModule)
  }

}
