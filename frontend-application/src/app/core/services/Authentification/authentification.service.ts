import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPayload } from 'src/app/models/Login-Payload/login-payload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://10.107.249.139/authentification';
  constructor(private http: HttpClient) {}

  registerUser(formData: FormData) {
    return this.http.post(`${environment.baseUrl}/auth/registerUser`, formData);
  }

  confirm(formData: FormData) {
    return this.http.post(`${environment.baseUrl}/auth/verifyUser`, formData);
  }

  login(user: LoginPayload) {
    return this.http.post(`${environment.baseUrl}/auth/login`, user);
  }
}
