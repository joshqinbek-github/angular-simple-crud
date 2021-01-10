import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  reactiveForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      username: new FormControl(
        null,
        [Validators.required, Validators.min(3), this.invalidName],
        this.asyncinvalidName
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl('critical'),
    });
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      console.log(this.reactiveForm);
    }
  }
  invalidName(control: FormControl): { [s: string]: boolean } {
    if (control.value == 'test') {
      return { invalidName: true };
    }

    return null;
  }

  asyncinvalidName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'testpro') {
          resolve({ invalidName: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }
}
