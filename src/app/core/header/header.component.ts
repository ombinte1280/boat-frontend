import {Component, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatButton
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  username: string = '';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const connectedUser = localStorage.getItem('user');

    if(connectedUser != null) {
      this.username = connectedUser;
    } else {
      this.router.navigateByUrl('/login');
    }

  }

  logout(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.router.navigateByUrl('/login');
  }

}
