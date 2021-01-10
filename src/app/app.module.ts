import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatInputModule} from "@angular/material/input";
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatSelectModule} from "@angular/material/select";
// import {MatRadioModule} from '@angular/material/radio';
// import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { InterceptorInterceptor } from './shared/interceptor.interceptor';
// import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
@NgModule({
  declarations: [
    AppComponent,
    // ReactiveFormComponent
  ],
  imports: [
    BrowserModule,
     AppRoutingModule,
     FormsModule,
     HttpClientModule,
    // BrowserAnimationsModule,
    // MatInputModule,
    // MatFormFieldModule,
    // MatSelectModule,
     ReactiveFormsModule,
    // MatRadioModule,
    // MatButtonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
