import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  users = [
    {name: "josh", email: "josh@josh.com", id: 1},
    {name: "bro", email: "bro@j.com", id: 2},
    {name: "Daniel", email: "dani@2.com", id: 3},
    {name: "Steve", email: "steve@jobs.com", id: 4}

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
