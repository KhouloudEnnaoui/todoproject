import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators,FormControl} from'@angular/forms';
import { TodoService }from './../services/todo.service'
import{UserService} from './../services/user.service'
import {User} from "./../models/user";
import{Router} from '@angular/router'
import {Todo} from './../models/todo'
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  form:FormGroup
  constructor(_fb:FormBuilder,private _UserService:UserService, private _todoService:TodoService,private _route:Router) {
    this.form=_fb.group({
         text:new FormControl('', [
          Validators.required])
    })
  
   }

   get text(){
      return this.form.get('text')
    }

   addtodo(){

     let _id:String
     let _token=JSON.parse(localStorage.getItem('userc'));
     //get the form  text value
     let formdetail=this.form.value;
     
     //instance user
     let user= new User();
     let todo= new Todo();
      // service 
      this._UserService.infoUser(_token).subscribe(

        res => {console.log(res);
             todo.creator=res._id;
             todo.text=formdetail.text;
              console.log(JSON.stringify(_id));

              this._todoService.todoAdd(todo).subscribe(
                res => {
                    console.log(res);
                    this._route.navigate(['/home']);
              })
        }),
        err => {
          console.log(err);
        }
      }
  ngOnInit() {
  }

}
