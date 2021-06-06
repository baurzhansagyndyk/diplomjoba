import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  image: string = 'assets/images/latynalipbi21.png'

  constructor() { }

  ngOnInit() {
  }

  welcomepage: string = 'assets/images/qazaqtanutitle.jpg'
  post1: string = 'assets/images/qasymhan.jpg'
  post2: string = 'assets/images/alac.webp'
  post3: string = 'assets/images/jeltoqsan1986.jpg'
  fonetica: string = 'assets/images/fonetika.jpg'
  lexica: string = 'assets/images/lexica.jpg'
  alipbi: string = 'assets/images/alippe.jpg'
  gramatica: string = 'assets/images/soztaptary.jpeg'
}
