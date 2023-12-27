import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Social-Media-App';
  Addedposts:any=[]

  onPostAdded(post:any){
    this.Addedposts.push(post)
  }

}
