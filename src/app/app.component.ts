import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sanitizeUrl';
  urlInput: string = '';
  isButtonDisabled: boolean = false;
  sanitizedUrl: string = ''; 
  flag:boolean = false;


  constructor(private toastr: ToastrService) {}



  toggleDarkMode(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    document.body.classList.toggle("dark", isChecked);
}

handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    this.sanitizeAndSubmit(); 
  }
}


  sanitizeAndSubmit() {
  
    if (this.urlInput.includes('[.]') && this.urlInput.includes('\\/')) {
      this.sanitizedUrl = this.urlInput.replace(/\[.\]/g, '.');
      this.sanitizedUrl = this.sanitizedUrl.replace(/\\\//g, '/');
      this.isButtonDisabled = true;
      this.flag = false

    }
    else {
      this.sanitizedUrl = this.urlInput.replace(/\./g, '[.]');
      this.sanitizedUrl = this.sanitizedUrl.replace(/\//g, '\\/');
      this.isButtonDisabled = true;
      this.flag = true
    }

  }
  

  copyToClipboard(text: string) {

      this.isButtonDisabled = false;
      navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard:', text);
        this.toastr.success('Text copied to clipboard', text,{
          positionClass:'toast-top-right'
        });
        
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        this.toastr.error('Failed to copy text: ', err);
        
      });
  }
}
