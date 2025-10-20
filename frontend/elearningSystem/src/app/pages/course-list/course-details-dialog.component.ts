import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../services/course.service';

@Component({
  selector: 'app-course-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Course Details: {{ data.course.title }}</h2>
    <mat-dialog-content class="mat-typography course-details-content">
      <p><strong>Description:</strong> {{ data.course.description }}</p>
      <!-- Add more details here as needed, e.g., instructor, duration, price -->
      <!-- Example: <p><strong>Instructor:</strong> {{ data.course.instructorName }}</p> -->
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCloseClick()">Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .course-details-content {
      padding-top: 20px;
      line-height: 1.8;
      font-size: 1.1em;
      color: #333;
    }
    .course-details-content strong {
        color: #004AAD;
    }
    h2[mat-dialog-title] {
        color: #004AAD;
        font-weight: 700;
        font-size: 1.8em;
    }
    button[mat-button] {
        background-color: #004AAD;
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }
    button[mat-button]:hover {
        background-color: #003380;
    }
  `]
})
export class CourseDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CourseDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { course: Course }
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}