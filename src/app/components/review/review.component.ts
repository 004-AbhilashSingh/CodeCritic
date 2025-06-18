import { Component, Input } from '@angular/core';
import { Review } from '../../interfaces/review';

@Component({
  selector: 'app-review',
  standalone: true,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {

  @Input() review!: Review;

  overallReview: string = '';
  positives: string[] = [];
  negatives: string[] = []; 
  suggestions: string[] = [];
  Score: number = 0;

  ngOnInit() {
    console.log("Review component initialized with review:", this.review);
    if (this.review) {
      this.overallReview = this.review.Overall_Review || '';
      this.positives = this.review.Positives || [];
      this.negatives = this.review.Negative || [];
      this.suggestions = this.review.Suggestions || [];
      this.Score = this.review.Score || 0;
    }
  }
}
