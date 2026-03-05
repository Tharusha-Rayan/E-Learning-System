import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service'; 
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error: string | null = null;
  isAuthenticating: boolean = false; // New flag for loading state

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Optional: Check if user is already logged in
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']); // Redirect if already authenticated
    }
  }

  login() {
    if (this.isAuthenticating) {
      return; // Prevent multiple submissions
    }

    this.error = null; // Clear previous errors
    this.isAuthenticating = true;

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
        this.isAuthenticating = false;
      },
      error: (err) => {
        console.error('Login error:', err);
        // Provide more user-friendly error messages based on the actual error if possible
        this.error = 'Invalid email or password. Please try again.';
        this.isAuthenticating = false;
      }
    });
  }
}