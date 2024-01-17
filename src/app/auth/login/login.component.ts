import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup | any;
  constructor(private userService:UsersService ,private router:Router){}
  ngOnInit(): void {
    this.formModel()
  }
  formModel() {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] }),
      name: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  login(){
    const email=this.form.value.email;
    const password=this.form.value.password;
    this.userService.login(email,password)
    this.router.navigate(["/"])
    
    
  }
}
