import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostForm } from '../models/post.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  @Input() title = '';
  @Input() body = '';
  @Output() publish = new EventEmitter<PostForm>();
  imgFile: string;
  imgName: string;
  postForm: FormGroup;

  get pf() {
    return this.postForm.controls;
  }

  constructor(
    private _apiService: ApiService,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl(this.title, [Validators.required]),
      body: new FormControl(this.body, [Validators.required]),
      image: new FormControl('', [Validators.required]),
      imgSrc: new FormControl('', [Validators.required]),
    });
    // this._activatedRoute.params
    //   .pipe(
    //     switchMap((params) => {
    //       if (!params.postId) {
    //         return of(null);
    //       }
    //       return this._apiService.getPost(params.postId);
    //     }),
    //   )
    //   .subscribe((response) => {
    //     if (response) {
    //       this.postForm = new FormGroup({
    //         title: new FormControl(response.title, [Validators.required]),
    //         body: new FormControl(response.body, [Validators.required]),
    //         image: new FormControl('', [Validators.required]),
    //         imgSrc: new FormControl('', [Validators.required]),
    //       });
    //     }
    //   });
  }

  onImageChange(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      console.log('file', file);
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.imgName = file.name;
        this.postForm.patchValue({
          imgSrc: file,
        });
      };
    }
  }

  submit() {
    const postForm: PostForm = {
      title: this.postForm.value.title,
      body: this.postForm.value.body,
      image: this.postForm.value.imgSrc,
    };
    this.publish.emit(postForm);
    this.postForm.reset();
  }
}
