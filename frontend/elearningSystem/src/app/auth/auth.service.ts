import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';



interface JwtPayload {
  [key: string]: any;
}


@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7130/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap(res => {
        localStorage.setItem('token', res.token);
      }));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  register(fullName: string, email: string, password: string, role: string) {
  return this.http.post(`${this.apiUrl}/register`, {
    fullName,
    email,
    password,
    role
  });
}

getRole(): string {
  const token = this.getToken();
  if (!token) return '';
  const decoded = jwtDecode<JwtPayload>(token);
  return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
}


  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  isTeacher(): boolean {
    return this.getRole() === 'Teacher';
  }

  isStudent(): boolean {
    return this.getRole() === 'Student';
  }


}