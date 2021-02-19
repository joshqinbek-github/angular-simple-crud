import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {



  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }

 
  }



