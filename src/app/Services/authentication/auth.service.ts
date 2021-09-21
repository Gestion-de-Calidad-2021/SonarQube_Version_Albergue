import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthAnswer } from 'src/app/models/AuthAnswer';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/User';
const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}
  loginurl: string = environment.loginUrl;
  updatePass: string = environment.updatePass;
  getUsersrUrl: string = environment.users;
  invalidLogin!: boolean;

  login(credentials: any): Observable<AuthAnswer> {
    let credentialToSend = JSON.stringify(credentials);
    let va = this.http.post<AuthAnswer>(
      this.loginurl,
      credentialToSend,
      httpOptions
    );
    return va;
  }

  changePassword(passwordNew: any): Observable<boolean> {
    let credentials = {
      Email: localStorage.getItem('user'),
      Password: passwordNew,
      ConfirmPassword: passwordNew,
    };
    let credentialToSend = JSON.stringify(credentials);
    let va = this.http.put<any>(this.updatePass, credentialToSend, httpOptions);
    localStorage.removeItem('user');
    return va;
  }
  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.getUsersrUrl);
  }

  sendEmail(email: any, newPass: string): Observable<any> {
    let va = this.http.post(
      'https://formspree.io/f/xdoyarwl',
      {
        name: email,
        replyto: email,
        message:
          'Estimado Usuario su nueva contraseña es:\n' +
          newPass +
          '\n Atentamente: Gerencia.',
      },
      httpOptions
    );
    return va;
  }
}
