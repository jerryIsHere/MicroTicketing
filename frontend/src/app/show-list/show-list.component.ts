import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../service/api.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-show-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterModule, MatCardModule, MatMenuModule, MatIconModule, MatToolbarModule],
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.sass'
})
export class ShowListComponent {
  public shows: Show[] | null = null;
  constructor(api: ApiService) {
    api.getShowList().then(result => {
      if (Array.isArray(result))
        this.shows = result
    });
  }

}

export interface Show {
  name: string;
}
