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

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;

    this.HttpClient.get('http://localhost:3000/api/posts' + queryParams)
      .pipe(
        map((backendResponse: any) => {
          return{ 
            posts:backendResponse.posts.map((post: any) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath,
            };
          }),
          maxPosts:backendResponse.maxPosts
        }
        })
      )
      .subscribe(
        (transformedPosts: any) => {
          this.posts = transformedPosts.posts;
          this.postUpdated.next({
            posts:[...this.posts],
            postCount:transformedPosts.maxPosts
          });
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
  addPost(title: string, content: string, image: File) {
    // const post = { id: null, title: title, content: content };
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image);

    this.HttpClient.post('http://localhost:3000/api/posts', postData).subscribe(
      (response: any) => {
        const post = {
          id: response.post.id,
          title: title,
          content: content,
          imagePath: response.post.imagePath,
        };
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        console.log(this.posts);
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
  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: any;
    if (typeof image == 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
      };
    }
    // const post = { id: id, title: title, content: content };
    this.HttpClient.put(
      'http://localhost:3000/api/posts/' + id,
      postData
    ).subscribe((response: any) => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex((p) => p.id === id);
      const post = {
        id: id,
        title: title,
        content: content,
        imagePath: response.imagePath,
      };
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
      // this.router.navigate(["/"]);
    });
  }

  getpost(id: string) {
    // return { ...this.posts.find((p: any) => p.id === id) };
    return this.HttpClient.get('http://localhost:3000/api/posts/' + id);
  }
}
