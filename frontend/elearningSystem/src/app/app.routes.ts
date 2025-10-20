import { Routes } from '@angular/router';
import { LoginComponent } from '../app/auth/login/login.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseFormComponent } from './pages/course-form/course-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent},
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/create', component: CourseFormComponent }

];