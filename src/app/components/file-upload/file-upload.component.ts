import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UploadEvent } from '../../interfaces/upload-event';
import { FileUploadEvent } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
  imports: [ButtonModule, FileUpload, ToastModule, CardModule],
  providers: [MessageService]
})
export class FileUploadComponent {

  constructor(private _messageService:MessageService) {

  }

  onUpload(event: FileUploadEvent) {
    // this._messageService.add({severity: 'info', summary: 'Success', detail: 'Your file has been uploaded successfully'});
  }
}
