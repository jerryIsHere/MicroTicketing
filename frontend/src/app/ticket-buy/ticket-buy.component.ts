import { Component, Input, ViewChild } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../service/api.service';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-ticket-buy',
  standalone: true,
  imports: [MatStepperModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './ticket-buy.component.html',
  styleUrl: './ticket-buy.component.sass'
})
export class TicketBuyComponent {
  _show: any | null = null;
  _id: string | null = null;
  @ViewChild('stepper')
  stepper!: MatStepper;
  @Input()
  set id(_id: string) {
    this._id = _id
    this.api.getShowInfo(_id).then(data => {
      this._show = data;
    })
  }
  buyForm: FormGroup = this._formBuilder.group({
    name: new FormControl('', [Validators.required]),
    seat: new FormControl('', [Validators.required])
  });
  constructor(private api: ApiService, private _formBuilder: FormBuilder) {

  }
  buy() {
    if (this._id && this.buyForm.valid) {
      this.api.buy(this._id, this.buyForm.controls["seat"].value, this.buyForm.controls["name"].value).then((result: any) => {
        console.log(this.stepper)
        if (result.success) {
          this.stepper.next();
        }
      })
    }
    else {
      this.buyForm.markAllAsTouched()
    }
  }

}
