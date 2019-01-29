import { Component, OnInit } from '@angular/core';
import { GetService } from '../../service/get.service';
import { TeachingMaterial } from '../../models/TeachingMaterial';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teaching-files',
  templateUrl: './teaching-files.page.html',
  styleUrls: ['./teaching-files.page.scss'],
})
export class TeachingFilesPage implements OnInit {

  files: Array<TeachingMaterial>
  id: string = null;
  
  constructor(private getService: GetService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.getService.findFileByModule(Number(this.id)).subscribe(files =>{
      this.files = files;
      console.log(this.files)
    });
  }

}
