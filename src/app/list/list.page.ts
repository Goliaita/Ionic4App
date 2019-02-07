import { Component, OnInit } from '@angular/core';
import { FcmService } from '../service/fcm.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  constructor(public fcm: FcmService) {}
  ngOnInit() {
  }

  getPermission() {
    this.fcm.getPermission().subscribe();
  }

}
