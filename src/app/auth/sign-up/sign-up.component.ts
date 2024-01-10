import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/Services/users.service';
// import { ResizeEvent } from 'angular-resizable-element';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup | any;

  constructor(private userService: UsersService) {}
  ngOnInit(): void {
    this.formModel();
    console.log(this.form);
  }

  formModel() {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] }),
      name: new FormControl(null, { validators: [Validators.required] }),
    });
  }
  userSignup() {
    if (this.form.invalid) {
      return;
    }
    const name = this.form.value.name;
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.userService.createUser(name, email, password);
    this.form.reset();
  }
}
