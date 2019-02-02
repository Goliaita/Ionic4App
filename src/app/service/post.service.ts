import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TmRating } from '../models/TmRating';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PostService {
  IP = '192.168.1.6';

  postRatingUrl: string = 'http://' + this.IP + ':8080/SpringApp/tmRating/add';

  constructor(public http: HttpClient) { 
    console.log('Hello PostProvider Provider');
  }

  postRating(rating: TmRating): Observable<TmRating>{
    return this.http.post<TmRating>(this.postRatingUrl, rating, httpOptions);
  }


}