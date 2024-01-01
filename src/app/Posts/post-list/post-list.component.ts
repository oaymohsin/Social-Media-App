import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/post.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {
posts:any=[]
private postSub:Subscription|any;
constructor(private postService:PostService){}

ngOnInit(){
  this.posts=this.postService.getPosts()
  this.postSub=this.postService.getPostUpdateListener().subscribe((post)=>{
    this.posts=post;
    // console.log(post)
  })
  // console.log(this.posts)

}
ngOnDestroy(){
  this.postSub.unSubscribe();
}

onDelete(id:string){
  this.postService.deletePost(id)
}
}
