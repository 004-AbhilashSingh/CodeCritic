import { Component,Input, ViewChild } from '@angular/core';
import {html} from 'diff2html';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pull-request-diff',
  standalone: false,
  templateUrl: './pull-request-diff.component.html',
  styleUrl: './pull-request-diff.component.css'
})
export class PullRequestDiffComponent {
  diff: string = '';
  @ViewChild('diffContainer',{static:true}) diffContainer: any;

  constructor(private router:Router){
    const nav = this.router.getCurrentNavigation();
    this.diff = nav?.extras?.state?.['diff'];
    console.log("Received diff:", this.diff);
  }

  ngOnInit() {
    
    if(this.diff) {
      const diffHtml = html(this.diff, {
        drawFileList: false,
        outputFormat: 'side-by-side',
      })
      console.log("Diff HTML:", diffHtml);
      this.diffContainer.nativeElement.innerHTML = diffHtml;
    } else {
      console.warn("No diff provided to display.");
    }
  }
}
