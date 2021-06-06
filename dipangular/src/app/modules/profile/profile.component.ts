import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  error:string = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['login'])
  }

  reports(){
    this.router.navigate(['reports'])
  }

  create(){
    this.router.navigate(['posts/create'])
  }

  favourite(){
    this.router.navigate(['posts/favorites'])
  }

  myposts(){
    this.router.navigate(['posts/my'])
  }

  myfav: string = 'assets/images/favourite.png'
  mypost: string = 'assets/images/post-it-icon.png'
  writepo: string = 'assets/images/pencil.webp'
  report: string = 'assets/images/report.png'
}

