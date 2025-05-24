import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'code-critic';
  userName:string = '';
  userImageUrl:string = '';

  constructor(private router:Router) {}

  async ngOnInit(){
      this.userName = await this.getUserName();
      this.userImageUrl = await this.getUserImageUrl();
  }

  goToCodeUpload() {
    this.router.navigate(['/uploadFile']);
  }

  getUserName():Promise<string> {
      return fetch('/getUserName',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if(response.ok) {
          return response.text();
        } else {
          return "Guest";
        }
      })
  }

  getUserImageUrl():Promise<string> {
      return fetch('/getUserImageUrl',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if(response.ok) {
          return response.text();
        } else {
          return "";
        }
      })
  }
}
