import { Routes } from '@angular/router';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowCreateComponent } from './show-create/show-create.component';
import { TicketBuyComponent } from './ticket-buy/ticket-buy.component';

export const routes: Routes = [
    { path: '', component: ShowListComponent },
    { path: '/show/create', component: ShowCreateComponent },
    { path: '/ticket/buy', component: TicketBuyComponent },
];
