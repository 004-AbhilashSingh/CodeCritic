import { Component,Input, ViewChild } from '@angular/core';
import {html} from 'diff2html';
import { Router } from '@angular/router';
import { PullReview } from '../../interfaces/pullReview';

@Component({
  selector: 'app-pull-request-diff',
  standalone: false,
  templateUrl: './pull-request-diff.component.html',
  styleUrl: './pull-request-diff.component.css'
})
export class PullRequestDiffComponent {
  diff: string = '';
  url:  string = '';
  sha: string = '';
  review: PullReview | null = null;
  reviewGenerated: boolean = false;
  @ViewChild('diffContainer',{static:true}) diffContainer: any;

  constructor(private router:Router){
    const nav = this.router.getCurrentNavigation();
    this.diff = nav?.extras?.state?.['diff'];
    this.url = nav?.extras?.state?.['url'];
    this.sha = nav?.extras?.state?.['sha'];
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

  reviewDiff() {
      fetch("http://127.0.0.1:8100/llm/review-pull-request",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"diff": this.diff})
          }
      ).then(async response => {
        if(response.ok) {
          const resp = await response.json();
          this.review = resp.review as PullReview;
          this.reviewGenerated = true;
        };
      })
  }

  addComment() {
    const ele = document.getElementById('review-container');
    if(ele){
      const comment = ele.innerText;
      if(comment && this.url) {
        fetch("/addComment",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "url": this.url,
            "comment": comment,
            "sha": this.sha
          })
        }).then(async response => {
          if(response.ok) {
            const resp = await response.text();
            console.log(resp);
          } else {
            console.error("Failed to add comment.");
          }
        })
      }
    }
  }
}
