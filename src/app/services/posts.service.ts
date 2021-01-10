import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Posts } from '../shared/posts.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  createAndStorePosts(title: string, content: string, get?: Function) {
    const postData: Posts = { title: title, content: content };
    this.http
      .post<{ name: string }>(
        'https://ng-http-69e5f-default-rtdb.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response'
        } 
        )
      .subscribe((res) => {
        get();
      });
  }

  fetchPosts() {
    return this.http
      .get(
        'https://ng-http-69e5f-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'Custom-header': "Hello Josh"}),
          responseType: "json"
        }
      )
      .pipe(
        map((responseData) => {
          const postsArray: Posts[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      );
  }

  onDeletePost(id: string){
   return this.http.delete(
      'https://ng-http-69e5f-default-rtdb.firebaseio.com/posts/'+id+".json"
    )
  }

  onClearPosts() {
    return this.http.delete(
      'https://ng-http-69e5f-default-rtdb.firebaseio.com/posts.json',
      
      {
        observe: 'events'
      }

    )
  }

  updatePost(id: string, newVal){
    return this.http.put(
      'https://ng-http-69e5f-default-rtdb.firebaseio.com/posts/'+id+".json",
      newVal
    )
    
  }
}
