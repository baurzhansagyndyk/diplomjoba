import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactForm } from '../models/contact-form.model';
import { Post, PostForm } from '../models/post.model';
import { Report } from '../models/report.model';
import { SuccessResonse } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly APIUrl = 'http://127.0.0.1:8000/api/';
  constructor(private _http: HttpClient) {}

  getPosts(title: string = ''): Observable<Post[]> {
    return this._http.get<Post[]>(`${this.APIUrl}posts/`, {
      params: {
        search: title,
      },
    });
  }

  getFavoritePosts(): Observable<Post[]> {
    return this._http.get<Post[]>(`${this.APIUrl}posts/favorites/`);
  }

  getMyPosts(): Observable<Post[]> {
    return this._http.get<Post[]>(`${this.APIUrl}posts/my/`);
  }

  getPost(id: number): Observable<Post> {
    return this._http.get<Post>(`${this.APIUrl}posts/${id}/`);
  }

  deletePost(id: number): Observable<any> {
    return this._http.delete(`${this.APIUrl}posts/${id}/`);
  }

  addLikeToPost(id: number): Observable<SuccessResonse> {
    return this._http.put<SuccessResonse>(
      `${this.APIUrl}posts/${id}/likes/`,
      {},
    );
  }

  removeLikeFromPost(id: number): Observable<SuccessResonse> {
    return this._http.delete<SuccessResonse>(
      `${this.APIUrl}posts/${id}/likes/`,
    );
  }

  addPostToFavorites(id: number): Observable<SuccessResonse> {
    return this._http.put<SuccessResonse>(
      `${this.APIUrl}posts/${id}/favorites/`,
      {},
    );
  }

  removePostFromFavorites(id: number): Observable<SuccessResonse> {
    return this._http.delete<SuccessResonse>(
      `${this.APIUrl}posts/${id}/favorites/`,
    );
  }

  createPost(postForm: PostForm): any {
    console.log('postForm', postForm);
    const formData = new FormData();
    formData.append('image', postForm.image, postForm.image.name);
    formData.append('title', postForm.title);
    formData.append('body', postForm.body);
    console.log('formData', formData);
    // for (let key of formData.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }
    return this._http.post<Post>(`${this.APIUrl}posts/`, formData);
  }

  updatePost(postForm: PostForm, postId: number): any {
    console.log('postForm', postForm);
    const formData = new FormData();
    if (postForm.image) {
      formData.append('image', postForm.image, postForm.image.name);
    }
    formData.append('title', postForm.title);
    formData.append('body', postForm.body);
    console.log('formData', formData);
    // for (let key of formData.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }
    return this._http.put<Post>(`${this.APIUrl}posts/${postId}/`, formData);
  }

  sendContactForm(contactForm: ContactForm): Observable<SuccessResonse> {
    return this._http.post<SuccessResonse>(`${this.APIUrl}send_mail/`, {
      name: contactForm.name,
      email: contactForm.email,
      phone_number: contactForm.phoneNumber,
      comments: contactForm.comments,
    });
  }

  getReports(): Observable<Report[]> {
    return this._http.get<Report[]>(`${this.APIUrl}reports/`);
  }

  createReport(text: string, postId: number): any {
    return this._http.post(`${this.APIUrl}reports/`, {
      text,
      post_id: postId,
    });
  }
}
