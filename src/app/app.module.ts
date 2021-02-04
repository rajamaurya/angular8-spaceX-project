import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent } from './components/header/header.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterDetailComponent } from './containers/filter-container/filter-detail.component';
import { HomeComponent } from './home/home.component';
import { AppService } from './app.service';
import { SpaceXComponent } from './components/spacex/spacex.component';
import { LoaderService } from './loader.service';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';
import { HttpInterceptorService } from './http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
   
    HeaderComponent,
    FilterComponent,
    FilterDetailComponent,
    HomeComponent,
    SpaceXComponent,
    LoaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AppService,
    LoaderService,
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
