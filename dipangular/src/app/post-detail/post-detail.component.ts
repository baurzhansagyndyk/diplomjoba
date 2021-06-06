import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { ReportComponent } from '../report/report.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  post: Post;
  postId: number;
  isLiked: boolean;
  isFavorited: boolean;

  constructor(
    private _apiService: ApiService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.initalizeValues();
  }

  initalizeValues(): void {
    this._route.params
      .pipe(
        switchMap(({ postId }) => {
          this.postId = postId;
          return this._apiService.getPost(+postId);
        }),
      )
      .subscribe((post) => {
        this.post = post;
        this.isLiked = post.is_liked;
        this.isFavorited = post.is_favorited;
      });
  }

  like(): void {
    this.isLiked = !this.isLiked;
    this.isLiked ? this.post.likes++ : this.post.likes--;
    if (this.isLiked) {
      this._apiService.addLikeToPost(this.postId).subscribe();
    } else {
      this._apiService.removeLikeFromPost(this.postId).subscribe();
    }
  }

  favorite(): void {
    this.isFavorited = !this.isFavorited;
    this.isFavorited ? this.post.favorites++ : this.post.favorites--;
    if (this.isFavorited) {
      this._apiService.addPostToFavorites(this.postId).subscribe();
    } else {
      this._apiService.removePostFromFavorites(this.postId).subscribe();
    }
  }

  removePost(postId: number): void {
    this._apiService.deletePost(postId).subscribe(() => {
      this._router.navigate(['madeniet']);
    });
  }

  openReport(): void {
    const dialogRef = this._dialog.open(ReportComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result.trim().length === 0) {
        return;
      }
      this.sendReport(result, this.postId);
    });
  }

  sendReport(text: string, postId: number): void {
    this._apiService.createReport(text, postId).subscribe((response) => {
      this._snackBar.open('Report was sended', 'Splash', {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar'],
        duration: 3000,
      });
    });
  }
}
