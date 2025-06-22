import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HomeComponent } from './components/home/home.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { PullRequestListComponent } from './components/pull-request-list/pull-request-list.component';
import { PullRequestDiffComponent } from './components/pull-request-diff/pull-request-diff.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'uploadFile', component: FileUploadComponent},
  {path:'repositories', component: RepositoryListComponent},
  {path: 'pullRequests', component: PullRequestListComponent}, 
  {path: 'pullRequestDetails', component: PullRequestDiffComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
