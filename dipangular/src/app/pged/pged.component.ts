import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-pged',
  templateUrl: './pged.component.html',
  styleUrls: ['./pged.component.scss'],
})
export class PgedComponent implements OnInit {
  posts: Post[] = [];
  constructor(private _apiService: ApiService) {}

  ngOnInit() {
    this._apiService.getPosts().subscribe((response) => {
      console.log(response);
      this.posts = response;
    });
  }
  onSearch(searchText: string): void {
    this._apiService.getPosts(searchText).subscribe((response) => {
      this.posts = response;
    });
  }
}
