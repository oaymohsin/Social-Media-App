import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  enteredTitle='';
  enteredContent='';
  form:FormGroup | any;
  imgpreview:String|any;

  constructor(private postService:PostService){}

  ngOnInit(){
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {validators: [Validators.required]})
    });
  }
  onAddPost(){
    const Post={
      title:this.form.value.title,
      content:this.form.value.content
    }
    this.postService.addPost(Post.title,Post.content)
    console.log(Post)
  }

  onImagePicked(event:Event){
    // const file=(event.target as HTMLInputElement).files[0];

    const inputElement = event.target as HTMLInputElement;

    if (inputElement && inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];
        this.form.patchValue({image:file});
        this.form.get('image').updateValueAndValidity();

        const reader=new FileReader()
        reader.onload=()=>{
          this.imgpreview=reader.result;
        }
        reader.readAsDataURL(file)
        // Rest of your code here
    } else {
        console.error("No file selected");
    }


  }
}
