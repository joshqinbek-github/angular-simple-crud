import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {map, take, tap} from "rxjs/operators";

const api = "https://ng-crud-auth-default-rtdb.firebaseio.com/users.json";

export interface User{
  id: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users = new BehaviorSubject(null);
  userChanges = new BehaviorSubject<boolean>(null);


  constructor(private http: HttpClient) {
    this.getUsers();
    this.userChanges.subscribe(changes=> {
      this.getUsers();      
    })
   }

  getUsers(){
    return this.http.get(api)
      .pipe(map(users => {
        let editedUsers = [];
        for(let key in users){
          editedUsers.push({id: key,...users[key]})
        };
       return editedUsers; 

      }))
      .subscribe(users => {
      this.users.next(users);
     
    });
  }
  

  addUser(data){
    return this.http.post(api, data);
  }

  updateUser(id, data){
    return this.http.put(`https://ng-crud-auth-default-rtdb.firebaseio.com/users/${id}.json`,data)
  }

  deleteUser(id){
    return this.http.delete(`https://ng-crud-auth-default-rtdb.firebaseio.com/users/${id}.json`)

  }
}
