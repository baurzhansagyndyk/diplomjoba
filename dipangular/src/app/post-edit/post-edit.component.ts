import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PostForm } from '../models/post.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
})
export class PostEditComponent implements OnInit {
  title: string;
  body: string;
  postId: number;
  constructor(
    private _apiService: ApiService,
    private _snackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {}

  ngOnInit() {
    this._activatedRoute.params
      .pipe(
        switchMap((params) => {
          this.postId = params.postId;
          return this._apiService.getPost(params.postId);
        }),
      )
      .subscribe((response) => {
        this.title = response.title;
        this.body = response.body;
      });
  }
  onPublish(postForm: PostForm): void {
    this._apiService.updatePost(postForm, this.postId).subscribe((response) => {
      this._snackBar.open('Succesfully Edited', 'Splash', {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar'],
        duration: 3000,
      });
      this._router.navigate(['madeniet']);
    });
  }
}
