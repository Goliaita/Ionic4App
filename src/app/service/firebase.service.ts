import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    console.log('Hello FirebaseProvider Provider');
  }


  getFiles(id: number, filename: string): Promise<string>{
    let url: string;
    let ref = this.storage.storage.ref('images/' + id + '/' + filename);

    return ref.getDownloadURL();

  }
}
