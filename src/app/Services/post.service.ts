import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: any = [];
  private postUpdated = new Subject();

  constructor(private HttpClient: HttpClient) {}

  getPosts() {
    this.HttpClient.get('http://localhost:3000/api/posts')
      .pipe(
        map((backendResponse: any) => {
          return backendResponse.posts.map((post: any) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe(
        (dataFromBackend: any) => {
          this.posts = dataFromBackend;
          this.postUpdated.next([...this.posts]);
        }
        // error => {
        //   console.error('Error fetching posts:', error);
        //   // Handle errors as needed
        // }
      );
  }
  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }
  addPost(title: string, content: string) {
    const post = { id: null, title: title, content: content };
    this.HttpClient.post('http://localhost:3000/api/posts', post).subscribe(
      (response: any) => {
        console.log(response.message);
        const id = response.postId;
        post.id = id;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      }
    );
  }
  deletePost(postId: string) {
    this.HttpClient.delete(
      'http://localhost:3000/api/posts/' + postId
    ).subscribe(() => {
      const updatedPosts = this.posts.filter((post: any) => post.id !== postId);
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }
  updatePost(id: string, title: string, content: string) {
    const post = { id: id, title: title, content: content };
    this.HttpClient.put('http://localhost:3000/api/posts/' + post.id,post)
    .subscribe(response => console.log(response));
  }

  getpost(id: string) {
    // return { ...this.posts.find((p: any) => p.id === id) };
    return this.HttpClient.get('http://localhost:3000/api/posts/' + id);
  }
}
