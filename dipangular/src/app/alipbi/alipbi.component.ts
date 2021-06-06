import { Component } from '@angular/core';

@Component({
  selector: 'app-alipbi',
  // template: `
  //   <p>This site was created in {{ birthday | date:format }}</p>
  //   <button (click)="toggleFormat()">Toggle Format</button>
  // `
  templateUrl: './alipbi.component.html',
  styleUrls: ['./alipbi.component.css']
  
})
export class AlipbiComponent {
  birthday = new Date(2019, 10, 30);
  toggle = true; // start with true == shortDate
  image: string = 'assets/images/latynalipbi21.png'

  get format()   { return this.toggle ? 'shortDate' : 'fullDate'; }
  toggleFormat() { this.toggle = !this.toggle; }
}
