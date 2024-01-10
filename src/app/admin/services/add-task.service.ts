import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  constructor(private http:HttpClient) { }

  apiUrl='http://localhost:3000/user'

  addFun(taskData:any):Observable<any>{
    return this.http.post(this.apiUrl,taskData)
  }

  
}
