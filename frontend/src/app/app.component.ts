import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GooglePickerService } from './service/google-picker.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'frontend';
  constructor(public googlePicker: GooglePickerService) {
  }
  selectFile() {
    this.googlePicker.openPicker((result: google.picker.ResponseObject) => { })
  }
}
