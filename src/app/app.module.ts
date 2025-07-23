import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { appConfig } from './app.config';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { PullRequestListComponent } from './components/pull-request-list/pull-request-list.component';
import { PullRequestDiffComponent } from './components/pull-request-diff/pull-request-diff.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressSpinner } from 'primeng/progressspinner';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RepositoryListComponent,
    PullRequestListComponent,
    PullRequestDiffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    HttpClientModule,
    ProgressSpinnerModule,
    ProgressSpinner
  ],
  providers: [...appConfig.providers],
  bootstrap: [AppComponent]
})
export class AppModule { }
