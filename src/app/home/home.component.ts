import { Component, OnInit } from '@angular/core';
import { TodoService } from './../services/todo.service';
import { UserService } from './../services/user.service';
import { Todo } from './../models/todo';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
 })

export class HomeComponent implements OnInit {

  //declaration
  id:String;
  token =JSON.parse(localStorage.getItem('userc'));
  public todos:Todo[]= []

 //constructeur
  constructor(private _userservice:UserService,private _todoservice:TodoService) { 
    let user= new User();
    let i=0
    console.log(this.token)

    //service get user info
    this._userservice.infoUser(this.token).subscribe(
      res => {
        console.log(res);
        user._id=res._id;
        console.log(JSON.stringify(user));

        //service get list todo
        this._todoservice.todoList(user._id).subscribe(
                res => {
                  console.log(res); 
                  for (i=0;i<res.todos.length;i++){
                         this.todos.push(res.todos[i])
                  }     
                  console.log(this.todos);
               })
       },
      err => {
        console.log(err);
      }
    )
  }

  ngOnInit() {
    //console.log(this.token)
    }

  //remove 
  remove_todo(todo){
    let id=todo._id
    let todoo=new Todo()

    //service get user info
    this._userservice.infoUser(this.token).subscribe(
      res => {
        console.log(res);
         let creator=res._id;
        
        console.log("iiiiiddd", JSON.stringify(creator),'tacheeee',id)
        //service delete todo
        this._todoservice.todoDelete(id,creator).subscribe(
          res=>{
            console.log(res);
            window.location.reload();
            /*  if you need to scroll back to top, here is the right place
           window.scrollTo(0, 0);
            */
            
          }
        )
      },
      err => {
         console.log(err);
    })

   }

 //done function 
  done(todo){
  let id=todo._id
  let todoo=new Todo()

  this._userservice.infoUser(this.token).subscribe(
    res=>{
      console.log(res);
      todoo.creator=res._id;
      todoo.completed=true;
      this._todoservice.todoUpdate(id,todoo).subscribe(
        res=>{
          console.log(res);
          window.location.reload();
        }
      )

    }
  )

   }
   
  
}