import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @Input() posts: Post[] = [];
  @Input() title = 'Посттар';
  @Output() search: EventEmitter<string> = new EventEmitter();
  searchFormControl = new FormControl('');
  constructor() {}

  ngOnInit() {
    this.searchFormControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.search.emit(value);
      });
  }
}
