import { Component,OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  private subscription: Subscription;

  constructor(private listService:ListService,private http:HttpClient){
    this.subscription = this.listService.myFunction$.subscribe(() => {
      this.myfun();
    });
  }

  editedIndex!:number
  edit:boolean=false
  nullData:boolean=false
  task!:string
  editing!:string
  isButtonActive:boolean[]=[]
  isInputSelected:boolean=false
  disableBtns:boolean=false
  isDisabled:boolean = false;
  activeItem3Activated:boolean = false;
  dataArr:any[]=[]

  ngOnInit() {
    this.myfun()
  }

  public myfun():void {
    this.listService.listItem().subscribe(
      (res: any) => {
        console.log(res);
        if (res.success == true) {
          this.dataArr = res.data; 
          console.log(this.dataArr);

        } else {
          console.log("Error in storing array");
        }
      },
      (err) => {
        console.log("Error occurred during the HTTP request:", err);
      }
    );
  }
 
  onDelete(id:string,task:string){
    this.http.delete(`http://localhost:3000/${id}/delete`).subscribe((res:any)=>{
      setTimeout(()=>{
        this.myfun()
      },1000)
    })
  }

  editMe(index:number){
    this.editedIndex = index;
    this.edit=true
  }

  onEdit(id:string,i:number){
    if(!this.editing){
      this.edit=false
    }
    else{
    const editedValue = this.editing
    this.http.patch(`http://localhost:3000/${id}/edit`,{task: editedValue}).subscribe((res:any)=>{
      this.edit=false
      this.editedIndex===i
      this.myfun()
    })
  }
  }
  toggleButton(i:number){
    this.isButtonActive[i] = !this.isButtonActive[i];
  }

}
