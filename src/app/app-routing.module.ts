import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*import {CourseComponent} from "./course/course.component";
import {CourseResolver} from "./services/course.resolver";*/
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './courses/home/home.component';

const routes: Routes = [
    {
        path: 'courses',
        loadChildren: './courses/courses.module#CoursesModule',
        canActivate: [AuthGuard],
    },
   /* {
        path: 'login',
        component : LoginComponent
      //  loadChildren: './courses/courses.module#CoursesModule',
       // canActivate: [AuthGuard],
    },*/
/*
    {
        path: 'courses/:id',
        component: CourseComponent,
        resolve: {
            course: CourseResolver
        }
    },
*/    
    {
        path: "",
        component: HomeComponent

    },
    {
        path: "**",
        redirectTo: '/'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
