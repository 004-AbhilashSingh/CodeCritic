import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
  imports: [ButtonModule, FileUpload, ToastModule, CardModule, TextareaModule, FormsModule, FloatLabel],
  providers: [MessageService]
})
export class FileUploadComponent {

  file:File | null = null;
  code:string = '';

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
}
