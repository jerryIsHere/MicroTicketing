import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GoogleService } from './service/google.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'frontend';
  constructor(public googlePicker: GoogleService) {
  }
  selectFile() {
    this.googlePicker.openPicker((result: google.picker.ResponseObject) => {
      console.log(result)
      this.googlePicker.getAccessToFile(result);

    })
  }
}
