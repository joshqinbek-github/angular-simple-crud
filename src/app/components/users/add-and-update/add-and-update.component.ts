import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService, User } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-and-update',
  templateUrl: './add-and-update.component.html',
  styleUrls: ['./add-and-update.component.css'],
})
export class AddAndUpdateComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isEditMode = false;
  editedId: string;
  formError = false;
  userSub: Subscription;
  editUser: User;
  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
   
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.isEditMode = !!params['id'];
        let id = params['id'];
        this.userSub = this.usersService.users.subscribe((users) => {
          this.editUser = users[+id];
          this.editedId = users[+id].id;
          console.log(this.editedId, id)
        });
      }
    });
   if(!this.isEditMode && !this.editUser){
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
   }else{
    this.form = new FormGroup({
      username: new FormControl(this.editUser.username, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(this.editUser.email, [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
      ]),
      password: new FormControl(this.editUser.password, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
   }
  }

  onSubmit() {
    if (this.form.valid) {
      if (!this.isEditMode) {
        this.usersService.addUser(this.form.value).subscribe((res) => {
          console.log('added');
        });
      } else {
        this.usersService
          .updateUser(this.editedId, this.form.value)
          .subscribe((res) => {
            console.log('edited!');
          });
      }
      this.formError = false;
      this.usersService.userChanges.next(true);
      this.router.navigate(['/users']);
    } else {
      this.formError = true;
      return;
    }
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }
}
