import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  page = {
    title: 'Home',
    subtitle: 'Welcome Home!',
    content: 'Some home content.',
    image: 'byung-ju-bong-.jpg'
  };

  title = 'angulartutorials';

  //ReadMore variable, its true than Read More string will print
  ReadMore:boolean = true;
  ReadMoore:boolean = true;
  
  //hiding info-card box
  visible:boolean = false;
  visiblte:boolean = false;

  //onclick toggling both
  onclivck()
  {
    this.ReadMore = !this.ReadMore; //not equal to
    this.visible = !this.visible //not equal to
  }
  onclick()
  {
    this.ReadMoore = !this.ReadMoore; //not equal to
    this.visiblte = !this.visiblte //not equal to
  }

  constructor() { }

  ngOnInit() {
  }
  numero = 'https://lh3.googleusercontent.com/proxy/5Kv4H6NyEzg3RFe227TYBFuCgAAwNbBsILv0DzFK7r6g6fjqpod7MuTZlWSyBCDK5PHZGon2kf2G4jZBBZUMgiyyipfeUtQYSjPlcjIJ_gdNrNjm2CSin-P7KXqdPDgV1v0KfKcfw-DYSU6ijd1q'
  anima = 'https://api.serke.org/uploads/5b76620531e74354afed70ee4dc8472f.jpg'
  pogoda = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzyJAk_77cTgQ4uUq0hyBv8XA4dCFerUQxtq_u69SFn2n6zSto7uO4qUeti7lO2pxlP4w&usqp=CAU'
  objectum = 'http://sun9-29.userapi.com/impg/c855624/v855624298/21e93d/WveDzZSi3VU.jpg?size=604x369&quality=96&sign=4faa8c907b63a5a46507de428e8187c9&type=album'
}
