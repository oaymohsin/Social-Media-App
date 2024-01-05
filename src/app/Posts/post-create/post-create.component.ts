import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/Services/post.service';
import { mimeType } from '../post-create/mime-type.validator';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  form: FormGroup | any;
  imgpreview: String | any;
  private mode = 'create';
  private postId: any = '';
  post: any = [];
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        // asyncValidators: [mimeType],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postService.getpost(this.postId).subscribe((fetchedpost: any) => {
          this.post = fetchedpost.posts;
          // console.log(this.post)
          this.form.patchValue({
            title: this.post.title,
            content: this.post.content,
          });
        });
        // console.log(this.post)
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onAddPost() {
    const Post = {
      id: this.form.value.id,
      title: this.form.value.title,
      content: this.form.value.content,
      image:this.form.value.image
    };

    if (this.mode === 'create') {
      this.postService.addPost(Post.title, Post.content,Post.image);
      // console.log(Post);
    } else {
      this.postService.updatePost(this.postId, Post.title, Post.content);
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    // const file=(event.target as HTMLInputElement).files[0];

    const inputElement = event.target as HTMLInputElement;

    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imgpreview = reader.result;
      };
      reader.readAsDataURL(file);
      // Rest of your code here
    } else {
      console.error('No file selected');
    }
  }
}
