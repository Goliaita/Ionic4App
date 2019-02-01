import { Component, OnInit, Input } from '@angular/core';
import { TeachingMaterial } from '../../../models/TeachingMaterial';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() file: TeachingMaterial;
  rate: number = 2;

  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.rate)
    console.log(this.file)
  };
}
