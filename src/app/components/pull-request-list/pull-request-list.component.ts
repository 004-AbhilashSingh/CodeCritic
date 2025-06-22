import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pull-request-list',
  standalone: false,
  templateUrl: './pull-request-list.component.html',
  styleUrl: './pull-request-list.component.css'
})
export class PullRequestListComponent {
  
  repository: string = '';
  pullRequests: any[] = [];

constructor(private router: Router) {
  this.repository = this.router.getCurrentNavigation()?.extras.state?.['repository'];
}

  async ngOnInit() {
    this.pullRequests = await this.getUserPullRequests(this.repository);
  }

  getUserPullRequests(repo:string):Promise<any[]> {
      return fetch('/getUserPullRequests',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: repo
      }).then((response) => {
        if(response.ok) {
          return response.json();
        } else {
          return "";
        }
      })
  }
}
