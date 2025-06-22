import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HomeComponent } from './components/home/home.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { PullRequestListComponent } from './components/pull-request-list/pull-request-list.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'uploadFile', component: FileUploadComponent},
  {path:'repositories', component: RepositoryListComponent},
  {path: 'pullRequests', component: PullRequestListComponent}, // Assuming this is the same component for pull requests
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
