import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { GoogleService } from '../service/google.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-show-create',
  standalone: true,
  imports: [MatStepperModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './show-create.component.html',
  styleUrl: './show-create.component.sass'
})
export class ShowCreateComponent {
  openPicker() {
    this.googleService.openPicker((picked: google.picker.ResponseObject) => {
      this.googleService.setShowInfo(picked, {
        date: this.showForm.controls["date"].value,
        seats: this.showForm.controls["seats"].value,
      }).then((_) => this.googleService.getAccessToFile(picked))

    });
  }
  showForm: FormGroup = this._formBuilder.group({
    date: new FormControl('', [Validators.required]),
    seats: new FormControl('', [Validators.required, Validators.min(1)])
  });
  constructor(private googleService: GoogleService, private _formBuilder: FormBuilder) {

  }
}

export interface ShowInfo {
  date: string;
  seats: number;
}