import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { PostForm } from '../models/post.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  constructor(
    private _apiService: ApiService,
    private _snackBar: MatSnackBar,
    private _router: Router,
  ) {}

  ngOnInit() {}
  onPublish(postForm: PostForm): void {
    this._apiService.createPost(postForm).subscribe((response) => {
      this._snackBar.open('Succesfully Created', 'Splash', {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar'],
        duration: 3000,
      });
      this._router.navigate(['madeniet']);
    });
  }
}
