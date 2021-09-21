import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {}
  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  }
  isUserAuthenticated() {
    var token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }
  isonThisPAge() {}
}
