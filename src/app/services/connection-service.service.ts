import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionServiceService {

  constructor(private http: HttpClient) { }

  registerUser(data: {email: string, password: string}) {
    let userData = {
      "id":"",
      "email": data.email,
      "password": data.password
    }
    let url = "http://localhost:8080/users";
    return this.http.post(url, userData, {observe: 'response'});
  }

  loginUser(data: any) {
    let userData = {
      "email": data.email,
      "password": data.password
    }
    let url = "http://localhost:8080/auth/login";
    return this.http.post(url, userData, {observe: 'response'});
  }

  resetPassword(email: any) {
    let url = "http://localhost:8080/users/resetPassword";
    return this.http.post(url, email, {observe: 'response'});
  }

}
