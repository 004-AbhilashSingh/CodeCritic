import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pull-request-list',
  standalone: false,
  templateUrl: './pull-request-list.component.html',
  styleUrl: './pull-request-list.component.css'
})
export class PullRequestListComponent {
  
  repositories: string[] = [];
  orgRepositories: string[] = [];
  orgs: string[] = [];
  pullRequests: any[] = [];
  showTable: boolean = false;

constructor(private router: Router) {
  
}

  async ngOnInit() {
    this.repositories = await this.getUserRepositories();
    this.orgs = await this.getUserOrgs();
    for(let repo of this.repositories) {
      const pullRequestsForRepo = await this.getUserPullRequests(repo);
      this.pullRequests.push(...pullRequestsForRepo);
    }
    for(let org of this.orgs) {
      const orgRepos = await this.getOrgRepositories(org);
      for(let repo of orgRepos) {
        const pullRequestsForOrgRepo = await this.getUserPullRequests(repo);
        this.pullRequests.push(...pullRequestsForOrgRepo);
      }
    }
    this.showTable = true;
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

  getUserRepositories():Promise<string[]> {
      return fetch('/getUserRepositories',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if(response.ok) {
          return response.json();
        } else {
          return "";
        }
      })
  }

  getUserOrgs():Promise<string[]> {
      return fetch('/getUserOrgs',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if(response.ok) {
          return response.json();
        } else {
          return "";
        }
      })
  }

  getOrgRepositories(org:string):Promise<string[]> {
      return fetch('/getOrgRepositories',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: org
      }).then((response) => {
        if(response.ok) {
          return response.json();
        } else {
          return "";
        }
      })
  }

  openPullRequest(pullRequest:any) {
    fetch('/getDiff',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'repositoryName': pullRequest.head.repo.full_name,
        'pullNumber': pullRequest.number,
      })
    }).then(async (diff) => {
      const diffText = await diff.text();
      this.router.navigate(['/pullRequestDetails'], { state: { diff: diffText } });
    }).catch((error) => {
      console.error("Error in openPullRequest:", error);
    })
  }
}
