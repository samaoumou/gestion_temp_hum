import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  endpoint: string = 'http://localhost:5000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public router: Router, private httpClient: HttpClient ) {}

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<User>(`${this.endpoint}/signin`, user)
  }

  update(id: any , user: User) {
    return this.http
      .put<User>(`${this.endpoint}/update-user/${id}`, user)
  }

  getUserById(id: any): Observable<any> {
    let API_URL = `${this.endpoint}/read-user/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
  getId() {
    return localStorage.getItem('id');
  }


  getUser(user: User) {
    return this.http.post<User>(`${this.endpoint}/signin`, user)
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['connexion']);
    }
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getAllUser(){
    let api = `${this.endpoint}/`;
    return this.http.get(api);
  }

  historique(){
    let api = `${this.endpoint}/historique`;
    return this.http.get(api);
  }

  miseAJour(id: any, data: any): Observable<any> {
    let API_URL = `${this.endpoint}/miseAJour/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  updatePassword(id: any, data: any): Observable<any> {
    console.log(id);

    console.log(data);

    let API_URL = `${this.endpoint}/updateUser/${id}`;

    return this.httpClient.patch(`${this.endpoint}/updateUser/${id}`, {"actuelPass": data.actuelPass,
  "newPass":data.newPass})
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}