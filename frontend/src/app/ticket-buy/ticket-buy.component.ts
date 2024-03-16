import { Component, Input } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

@Component({
  selector: 'app-ticket-buy',
  standalone: true,
  imports: [],
  templateUrl: './ticket-buy.component.html',
  styleUrl: './ticket-buy.component.sass'
})
export class TicketBuyComponent {
  _id: string | null = null;
  @Input()
  set id(_id: string) {
    this._id = _id;
  }

}
