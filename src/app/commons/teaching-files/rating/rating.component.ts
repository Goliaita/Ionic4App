import { Component, OnInit, Input } from '@angular/core';
import { TeachingMaterial } from '../../../models/TeachingMaterial';
import { AuthService } from '../../../service/auth.service';
import { Student } from '../../../models/Student';
import { PostService } from '../../../service/post.service';
import { TmRating } from '../../../models/TmRating';
import { GetService } from '../../../service/get.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Module } from '../../../models/Module';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() file: TeachingMaterial;
  @Input() selectedModule: Module;
  rate: number = 2;
  student: Student;
  rating: TmRating = {};
  rated: boolean = true;

  constructor(private authService: AuthService,
              private postService: PostService,
              private getService: GetService,
              private firestore: AngularFirestore) { 
    this.student = this.authService.getLoggedUser('user');
  }

  ngOnInit() {
    this.getRating();
  }

   getRating() {
    this.getService.findTRByStudentAndTM(this.student.studentId, this.file.teachingMaterialId).
    subscribe(rating => {
      if (rating != null) {
        this.rating = rating;
        this.rated = true;
      } else {
        this.rated = false;
      }
    });
  }
  onSubmit() {
    this.rating.rate = String(this.rate);
    this.rating.student = this.student;
    this.rating.teachingMaterial = this.file;
    this.postService.postRating(this.rating).subscribe( rating => {
      if (rating != null) {
        this.getRating();
         this.firestore.collection('tickets').doc(String(this.selectedModule.professor.person.personId))
        .collection('ratings').add(
          {
            file: this.file.fileName,
            rate: this.rate
          }
        );
      }
    });
  }
}
