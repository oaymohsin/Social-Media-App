import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {
posts:any=[]
totalPosts=0
postsPerPage=2
currentPage=1
pageSizeOptions=[1,2,5,10]
private postSub:Subscription|any;
constructor(private postService:PostService){}

ngOnInit(){
  this.posts=this.postService.getPosts(this.postsPerPage,this.currentPage)
  this.postSub=this.postService.getPostUpdateListener()
  .subscribe((post:any)=>{
    // console.log(post)
    this.totalPosts=post.postCount;
    this.posts=post.posts
    // console.log(post)
  })
  // console.log(this.posts)

}

onChangedPage(pageData:PageEvent){
  console.log(pageData)
  this.currentPage=pageData.pageIndex+1;
  this.postsPerPage=pageData.pageSize;
  this.postService.getPosts(this.postsPerPage,this.currentPage)
}
ngOnDestroy(){
  this.postSub.unsubscribe();
}

onDelete(id:string){
  this.postService.deletePost(id).subscribe(()=>{
    this.postService.getPosts(this.postsPerPage,this.currentPage) 
  })
}
}
