import { Component, OnInit } from '@angular/core';
import { UsersService } from './Services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Social-Media-App';
  Addedposts:any=[]
  constructor(private userService:UsersService){}

ngOnInit(): void {
  this.userService.autoAuthUser()
}
  onPostAdded(post:any){
    this.Addedposts.push(post)
  }


}
