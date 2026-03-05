import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service'; // Adjust path if necessary
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  fullName = '';
  email = '';
  password = '';
  role = 'Student'; // Default role
  error: string | null = null;
  isRegistering: boolean = false; // New flag for loading state

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Optional: Redirect if already logged in (might not be desired for registration)
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  register() {
    if (this.isRegistering) {
      return; // Prevent multiple submissions
    }

    this.error = null; // Clear previous errors
    this.isRegistering = true;

    this.auth.register(this.fullName, this.email, this.password, this.role).subscribe({
      next: () => {
        // Registration successful, redirect to login page
        this.router.navigate(['/login']);
        this.isRegistering = false;
      },
      error: (err) => {
        console.error('Registration error:', err);
        // Provide more user-friendly error messages based on the actual error if possible
        if (err.status === 409) { // Example: Conflict for existing user
          this.error = 'An account with this email already exists.';
        } else {
          this.error = 'Registration failed. Please try again.';
        }
        this.isRegistering = false;
      }
    });
  }
}