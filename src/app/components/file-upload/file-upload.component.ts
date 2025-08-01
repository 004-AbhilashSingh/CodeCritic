import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';
import { Review } from '../../interfaces/review';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
  imports: [ButtonModule, FileUpload, ToastModule, CardModule, TextareaModule, FormsModule, FloatLabel,ReviewComponent],
  providers: [MessageService]
})
export class FileUploadComponent {

  file:File | null = null;
  code:string = '';
  review!:Review;
  showReview:boolean = false;

  constructor(private _messageService:MessageService) {

  }

  onUpload(event: any) {
    this.file = event.files[0];
    this._messageService.add({severity: 'success', summary: 'File Uploaded', detail: ''});
  }

  processFile() {
    if (this.file) {
      const reader = new FileReader();
      reader.readAsText(this.file);
      reader.onloadend = () => {
        this._messageService.add({severity: 'info', summary: 'File Processed', detail: ''});
        this.code = reader.result as string;
      }
    }
  }

  async reviewFile() {
    if(this.code) {
      this._messageService.add({severity: 'info', summary: 'File Review', detail: 'Reviewing the file content...'});
      this.showReview = false;
      fetch('https://codecriticengine.onrender.com/llm/review-code',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: this.code })
      }).then(async response => {
        if (!response.ok) {
          console.error("Error in code review:", response);
        }
        response.json().then(data => {
          console.log("Review response:", data);
          this.review = data as Review;
          console.log("Review object:", this.review);
          this.showReview = true;
          this._messageService.add({severity: 'success', summary: 'Review Completed', detail: 'Code review completed successfully!'});
        })
      })
    }
  }
}
