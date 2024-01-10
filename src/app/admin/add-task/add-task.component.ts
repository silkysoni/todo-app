import { Component,ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListService } from '../services/list.service';
import { CardsComponent } from '../cards/cards.component';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { AddTaskService } from '../services/add-task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent  {


  @ViewChild(CardsComponent) cardsComponent!: CardsComponent;

  listForm!:FormGroup
  nullData:boolean=false
  task!:string

  constructor(private http :HttpClient,private listService:ListService, private addtaskservice:AddTaskService){}

  callMyFunction() {
    this.listService.triggerMyFunction();
  }

  onSubmit() {
    if (!this.task) {
      this.nullData=true
      return;
    }
    const taskData = { task: this.task };

    this.addtaskservice.addFun(taskData).subscribe(
      (response: any) => {
        this.nullData=false
        console.log(response);
        setTimeout(()=>{
          this.callMyFunction()
        },1000)
        this.task=''
      },
      (error) => {
        console.error(error);
      }
    );
  }
 
}
