import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts:any=[]
  private postUpdated= new Subject()

  constructor(private HttpClient:HttpClient) { }

  getPosts(){
    this.HttpClient.get('http://localhost:3000/api/posts')
    .subscribe((datafrombackend:any)=>{
      this.posts=datafrombackend.posts;
    this.postUpdated.next([...this.posts])

    })

  }
  getPostUpdateListener(){
    return this.postUpdated.asObservable()
  }
  addPost(title:string,content:string){
    const post={title:title,content:content}
    this.posts.push(post)
    this.postUpdated.next([...this.posts])
  }
}
