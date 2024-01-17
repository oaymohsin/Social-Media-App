import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../Services/users.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy{
userIsAuthenticated=false;
private authListenerSubs:Subscription | any;

constructor(private userService:UsersService, private router:Router){}

ngOnInit(): void {
  this.userIsAuthenticated= this.userService.getisAuthenticated()
  this.authListenerSubs=this.userService.getAuthStatusListener()
  .subscribe(isAuthenticated=>{
    this.userIsAuthenticated=isAuthenticated
  })
}
onLogOut(){
  this.userService.logOut()
}

ngOnDestroy(): void {
  this.authListenerSubs.unsubscribe()
}

}
