import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit, OnDestroy {

  users = [];
  userSub: Subscription;
  isLoading = true;


  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
  this.userSub = this.usersService.users.subscribe(users => {
    this.users = users;
    if(users){
      this.isLoading = false;
    }else{
      this.isLoading = true;    
    }
  })
}
  deleteUser(id){
    let del = confirm("do you really want to delete " + this.users[id].username+"?");
    if(del)
     this.usersService.deleteUser(this.users[id].id).subscribe(res => {
       this.usersService.userChanges.next(true);
      
       })
    else 
      return;
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
