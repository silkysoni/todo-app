import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http:HttpClient) { }

  listItem(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  private myFunctionSubject = new Subject<void>();

  myFunction$ = this.myFunctionSubject.asObservable();

  triggerMyFunction() {
    this.myFunctionSubject.next();
  }
}
