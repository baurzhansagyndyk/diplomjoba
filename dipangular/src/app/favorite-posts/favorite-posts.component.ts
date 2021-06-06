import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-favorite-posts',
  templateUrl: './favorite-posts.component.html',
  styleUrls: ['./favorite-posts.component.css'],
})
export class FavoritePostsComponent implements OnInit {
  posts: Post[] = [];
  constructor(private _apiService: ApiService) {}

  ngOnInit() {
    this._apiService.getFavoritePosts().subscribe((response) => {
      console.log(response);
      this.posts = response;
    });
  }
}
