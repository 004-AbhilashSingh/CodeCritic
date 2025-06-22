import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { appConfig } from './app.config';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { PullRequestListComponent } from './components/pull-request-list/pull-request-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RepositoryListComponent,
    PullRequestListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    HttpClientModule
  ],
  providers: [...appConfig.providers],
  bootstrap: [AppComponent]
})
export class AppModule { }
