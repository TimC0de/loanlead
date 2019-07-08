import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AppComponent} from './app.component';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
