import { Component, OnInit } from '@angular/core';
import{ FormGroup,FormBuilder,Validators,FormControl,}from '@angular/forms'
import{Router}from'@angular/router'
import{Todo} from'./../models/todo'
import{User } from'./../models/user'
import{TodoService }from'./../services/todo.service'
import{UserService} from './../services/user.service'
import { ActivatedRoute } from "@angular/router";
import { empty } from 'rxjs';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent implements OnInit {
   //declaration 
   form:FormGroup;
   token =JSON.parse(localStorage.getItem('userc'));
   id : String;
   textt:String;
   textvalidation=true
  constructor(_fb:FormBuilder,private _userService:UserService,
    private _todoService:TodoService,private _router:Router,private route: ActivatedRoute) { 
    this.form=_fb.group({
        text: new FormControl('', [  
          Validators.required
        ])
    })
  
    //recuperation de l'id de todo
     this.id = this.route.snapshot.paramMap.get("id");
     this.textt = this.route.snapshot.paramMap.get("text");
    console.log(this.id,this.textt)
  }

 
 

  //fct update
  update(){
   let detail=this.form.value;
   let todo= new Todo();
   if(detail.text!=''){
   todo.text= detail.text;
   this._userService.infoUser(this.token).subscribe(
      res=>{
          console.log(res);
          todo.creator=res._id;
          this._todoService.todoUpdate(this.id,todo).subscribe(
             res=>{
               console.log(res)
               this._router.navigate(['/home']);
             }
          )
         
      }
   )}
   else
      this.textvalidation=false
  
  }


  ngOnInit() {
  }

}
