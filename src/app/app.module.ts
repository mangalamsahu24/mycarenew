import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { LoginComponent } from './home/login/login.component';
import { AppointmentComponent } from './admin/appointment/appointment.component';
import { RegisterComponent } from './home/register/register.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './admin/file-upload/file-upload.component';
import { AdminComponent } from './admin/admin.component';
import { BodyComponent } from './home/body/body.component';
import { MainComponent } from './admin/main/main.component';
import { MessageComponent } from './admin/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AppointmentComponent,
    RegisterComponent,
    ProfileComponent,
    FileUploadComponent,
    AdminComponent,
    BodyComponent,
    MainComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,


    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
],
  providers: [],
  bootstrap: [AppComponent]

  
})
export class AppModule { }
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}


