import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAndUpdateComponent } from './components/users/add-and-update/add-and-update.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UsersTableComponent } from './components/users/users-table/users-table.component';
import { UsersComponent } from './components/users/users.componet';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: "full"},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard], children: [
    {path: '', component: UsersTableComponent},
    {path: 'add', component: AddAndUpdateComponent},
    {path: 'update/:id', component: AddAndUpdateComponent}
  ]},
  {path: 'login', component: SignUpComponent},
 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



