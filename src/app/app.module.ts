









































  import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule }         from './app-routing.module';
import { AppComponent }             from './app.component';
import { HomeComponent }            from './home/home.component';
import { ProjectDetailComponent }   from './project-detail/project-detail.component';
import { SafeUrlPipe }              from './safe-url.pipe';
import { NavbarComponent }          from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectDetailComponent,
    SafeUrlPipe,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
