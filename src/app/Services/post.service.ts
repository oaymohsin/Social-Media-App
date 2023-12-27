import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts:any=[]
  private postUpdated= new Subject()

  constructor() { }

  getPosts(){
    return [...this.posts]
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
