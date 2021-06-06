import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css'],
})
export class UserPostsComponent implements OnInit {
  posts: Post[] = [];
  constructor(private _apiService: ApiService) {}

  ngOnInit() {
    this._apiService.getMyPosts().subscribe((response) => {
      console.log(response);
      this.posts = response;
    });
  }
}
