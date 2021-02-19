import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/services/auth.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  isLoading = false;
  isLogin = true;
  form: FormGroup;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      // username: new FormControl(null, [
      //   Validators.required,
      //   Validators.minLength(3),
      // ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.isLoading = true;
   
    const email = this.form.value.email;
    const password = this.form.value.password;
    let authObs: Observable<AuthResponseData>;

    if (this.isLogin) {
      authObs = this.authService.login(email,password);
      } 
      else {
         authObs = this.authService.signup(email,password);
      }
      
      authObs.subscribe(res => {
        this.isLoading = false;
        this.router.navigate(['/users'])

      },err =>{
       this.error = err;
       this.isLoading = false;
       
     })

      this.form.reset()
  }
}
