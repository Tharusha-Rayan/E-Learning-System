import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Course {
  id?: number; // 'id' is optional for new courses
  title: string;
  description: string;
  createdBy?: string;
  createdAt?: string;
}


export type CourseWithId = Course & { id: number };


@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = 'https://localhost:7130/api/course';

  constructor(private http: HttpClient) { }

  getAll(): Observable<CourseWithId[]> { // Expect courses with IDs when fetching
    return this.http.get<CourseWithId[]>(this.apiUrl);
  }

  create(course: Course): Observable<CourseWithId> { // Create takes a Course (id optional), returns CourseWithId
    // The backend will assign an ID, so the response will contain it.
    return this.http.post<CourseWithId>(this.apiUrl, course);
  }

  update(id: number, course: CourseWithId): Observable<CourseWithId> { // Update requires an ID in the URL and the course object
    // When updating, we expect the course object itself to have an ID,
    // or at least be passed one explicitly. CourseWithId clarifies this.
    return this.http.put<CourseWithId>(`${this.apiUrl}/${id}`, course);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Optional: Add a method to get a single course by ID, useful for edit/view details
  getById(id: number): Observable<CourseWithId> {
    return this.http.get<CourseWithId>(`${this.apiUrl}/${id}`);
  }

  enroll(courseId: number): Observable<any> {
    return this.http.post(`/api/enrollments?courseId=${courseId}`, {});
  }

  getMyCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`/api/enrollments/mine`);
  }
}