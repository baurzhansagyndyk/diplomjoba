import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-anima-site';
  color: string;
  birthday = new Date(2000, 1, 30);

  email: string;
  password: string;

  constructor() {}

}
