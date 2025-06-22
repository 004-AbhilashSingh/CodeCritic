import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-repository-list',
  standalone: false,
  templateUrl: './repository-list.component.html',
  styleUrl: './repository-list.component.css'
})
export class RepositoryListComponent {

  repositories: string[] = [];

  constructor(private router: Router) { 
    
  }

  async ngOnInit() {
    this.repositories = await this.getUserRepositories();
  }

  goToPullRequests(repository: string) {
    this.router.navigate(['/pullRequests'], { state: { repository: repository } });
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


}
