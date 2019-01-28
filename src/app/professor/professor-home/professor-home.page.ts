import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Professor } from '../../models/Professor';

@Component({
  selector: 'app-professor-home',
  templateUrl: './professor-home.page.html',
  styleUrls: ['./professor-home.page.scss'],
})
export class ProfessorHomePage implements OnInit {

  professor: Professor = null;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.professor = this.authService.getLoggedUser('user');
    console.log(this.professor);
  }

}
