import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private HttpClient:HttpClient) { }

  createUser(name:string,email:string,password:string){
    const userData={
      name:name,
      email:email,
      password:password
    }
    this.HttpClient.post('http://localhost:3000/api/user/signup',userData).subscribe((response)=>{
      console.log(response)
    })
  }
}
