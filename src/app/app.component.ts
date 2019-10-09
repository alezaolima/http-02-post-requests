import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  ngOnInit() {
    this.fetchPosts();
  }

  constructor(private http: HttpClient) {}

  
  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post<{name:string}>(
        'https://testproject-98323.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  private fetchPosts(){
    this.http
      .get<{ [key:string]: Post }>(
        'https://testproject-98323.firebaseio.com/posts.json')
      .pipe(map(responseData=>{
        const postsArray=[];
        for (const key in responseData){
          if  (responseData.hasOwnProperty(key)){
            postsArray.push({...responseData[key], id:key});
          }
        }
        return postsArray;
      }))
      .subscribe(posts=>{
        console.log(posts);
        this.loadedPosts=posts;
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }
}
