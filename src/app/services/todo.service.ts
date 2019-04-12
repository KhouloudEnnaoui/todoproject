import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _todoListUrl="http://localhost:3000/todo/todoList/";
  private _todoAdd="http://localhost:3000/todo/addTodo";
  private _todoDelete="http://localhost:3000/todo/deleteTodo/";
  private _todoUpdate="http://localhost:3000/todo/updateTodo/"
  private _todoDetail="http://localhost:3000/todo/todoDetails/"
  constructor(private http: HttpClient) { }

  todoList(user){
    return this.http.get<any>(this._todoListUrl+user);
  }
  
 todoAdd(todo){
  return this.http.post<any>(this._todoAdd,todo)
 }

 todoDelete(id,creator){
  return this.http.delete<any>(this._todoDelete+id+"/"+creator)

 }

 todoUpdate(id,todo){
  return this.http.patch<any>(this._todoUpdate+id,todo)
}

todoDetail(id,todo){
  return this.http.get<any>(this._todoDetail+id,todo)
}
}
