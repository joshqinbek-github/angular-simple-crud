import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersTableComponent } from './components/users/users-table/users-table.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddAndUpdateComponent } from './components/users/add-and-update/add-and-update.component';
import { UsersComponent } from './components/users/users.componet';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    NavComponent,
    HomeComponent,
    SignUpComponent,
    AddAndUpdateComponent,
    UsersComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
   
  ],
  providers: [
     {
       provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptorService,
       multi: true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
