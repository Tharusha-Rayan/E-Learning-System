import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, Course, CourseWithId } from '../../services/course.service';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Import MatDialog
import { CourseDetailsDialogComponent } from './course-details-dialog.component'; // Import dialog component
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // For toast messages

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule, MatSnackBarModule], // Add MatDialogModule and MatSnackBarModule
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  private courseService = inject(CourseService);
  private authService = inject(AuthService); // Renamed to avoid conflict
  private router = inject(Router);
  private dialog = inject(MatDialog); // Inject MatDialog
  private snackBar = inject(MatSnackBar); // Inject MatSnackBar for notifications
  courses: CourseWithId[] = [];
  // courses: Course[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.isLoading = true;
    this.hasError = false;
    this.courseService.getAll().subscribe({
      next: (data) => {
        this.courses = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
        this.hasError = true;
        this.isLoading = false;
        this.snackBar.open('Failed to load courses!', 'Close', {
          duration: 5000,
          panelClass: ['snackbar-error'] // Custom CSS for error snackbar
        });
      }
    });
  }

  // --- Role-based Access Control ---
  showCreateButton(): boolean {
    const role = this.authService.getRole();
    return role === 'Admin' || role === 'Teacher';
  }

  showEditDeleteButtons(): boolean {
    const role = this.authService.getRole();
    return role === 'Admin' || role === 'Teacher';
  }

  // --- Course Actions ---

  // Opens the Course Details in a Material Dialog
  viewCourseDetails(courseId: number) {
    // Find the course details to pass to the dialog
    const course = this.courses.find(c => c.id === courseId);
    if (course) {
      this.dialog.open(CourseDetailsDialogComponent, {
        width: '600px', // Set dialog width
        data: { course: course } // Pass course data to the dialog
      });
    } else {
      this.snackBar.open('Course details not found.', 'Close', { duration: 3000 });
    }
  }

  // Navigates to the course edit form
  editCourse(courseId: number) {
    if (this.showEditDeleteButtons()) { // Double-check role for security
      this.router.navigate(['/courses/edit', courseId]);
    } else {
      this.snackBar.open('You do not have permission to edit courses.', 'Close', { duration: 3000, panelClass: ['snackbar-warning'] });
    }
  }

  // Handles course deletion
  deleteCourse(courseId: number) {
    if (!this.showEditDeleteButtons()) { // Double-check role
      this.snackBar.open('You do not have permission to delete courses.', 'Close', { duration: 3000, panelClass: ['snackbar-warning'] });
      return;
    }

    if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      this.courseService.delete(courseId).subscribe({
        next: () => {
          this.snackBar.open('Course deleted successfully!', 'Close', { duration: 3000, panelClass: ['snackbar-success'] });
          this.loadCourses(); // Reload courses to update the list
        },
        error: (err) => {
          console.error('Error deleting course:', err);
          this.snackBar.open('Failed to delete course. Please try again.', 'Close', { duration: 5000, panelClass: ['snackbar-error'] });
        }
      });
    }
  }

  enroll(courseId: number) {
    this.courseService.enroll(courseId).subscribe({
      next: () => alert('Enrolled successfully!'),
      error: err => alert(err.error)
    });
  }
}