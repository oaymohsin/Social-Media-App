import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private HttpClient: HttpClient, private router: Router) {}
  private token: string | any;
  private isAuthenticated = false;
  private tokenTimer: any;
  private userId: string | any;

  private authStatusListener = new Subject<boolean>();

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getisAuthenticated() {
    return this.isAuthenticated;
  }
  getToken() {
    return this.token;
  }
  getUserId() {
    return this.userId;
  }
  createUser(name: string, email: string, password: string) {
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    this.HttpClient.post(
      'http://localhost:3000/api/user/signup',
      userData
    ).subscribe((response) => {
      console.log(response);
    });
  }

  login(email: string, password: string) {
  // console.log(this.userId)
    const userData = { email: email, password: password };
    this.HttpClient.post(
      'http://localhost:3000/api/user/login',
      userData
    ).subscribe((response: any) => {
      const token = response.token;
      
      this.token = token;
      if (token) {
        const expireInDuration = response.expiresIn;
        this.setAuthTimer(expireInDuration);
        this.isAuthenticated = true;
        this.userId = response.userId;
        // console.log(this.userId)
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + expireInDuration * 1000
        );
        // console.log(expirationDate);
        this.saveAuthData(token, expirationDate,this.userId);
      }
      // console.log(this.token);
      // console.log(this.userId)
    },error=>{
      return
    })
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId=authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logOut() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId=null
    this.router.navigate(['../']);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId')
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem("userId");

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId

    };
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }
}
