import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Posts } from './shared/posts.model';
import { PostsService } from './services/posts.service';
import { NgForm } from '@angular/forms';

// import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;
  error = null;
  isEdit = false;
  editId: string;

  @ViewChild('postForm') postForm: NgForm;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    
    this.onFetchPosts();
  }

  onCreatePost(postData: Posts) {
    if(!this.isEdit){
        // Send Http request
    this.postsService.createAndStorePosts(
      postData.title,
      postData.content,
      this.onFetchPosts.bind(this)
    );
    }else{
      this.postsService.updatePost(this.editId,this.postForm.value).subscribe(
        res => {
          this.onFetchPosts();
        }
      )
      this.isEdit = false;
    }
    this.postForm.reset();
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      (error) => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  onDeletePost(id: string){
    this.postsService.onDeletePost(id).subscribe(res => {
      this.onFetchPosts()
    })
  }

  onClearPosts() {
    this.postsService.onClearPosts().subscribe((res) => {
      this.loadedPosts = [];
    });
  }
    
  onEdit(id: string){
    this.isEdit = true;
    this.editId = id;
    let post = this.loadedPosts.find(p => p.id = id);
    this.postForm.setValue({title: post.title, content: post.content})
    

  }  

  
}

//   signupForm: FormGroup;
//   fbnames = ['john', 'anna'];

//   constructor(private formBuilder: FormBuilder){}

// ngOnInit(){
//   this.signupForm = new FormGroup({
//     "username": new FormControl(null, [Validators.required, Validators.minLength(3), this.forbiddenNames.bind(this)] ),
//     "email": new FormControl(null, [Validators.required, Validators.email]),
//     'gender': new FormControl('male'),
//     "hobbies": new FormArray([])
//   })
// }

// onReactiveSubmit(){
//   console.log(this.signupForm);

// }

// onAddHobby(){
//   const control = new FormControl(null, Validators.required);
//   (<FormArray>this.signupForm.get('hobbies')).push(control);
// }

// getControls() {
//   return (<FormArray>this.signupForm.get('hobbies')).controls;
// }

// forbiddenNames(control: FormControl): {[s: string]: boolean} {
//   if(this.fbnames.indexOf(control.value) !== -1 ){
//     return {'nameIsForbidden': true}
//   }
//   return null;
// }

// @ViewChild("form") form: NgForm;

// onSubmit(form: NgForm, isValid){

//    this.form.form.patchValue({
//      username: "paqapaq"
//    })

//   if(isValid){
//   console.log(form.form)
//   }
// }
