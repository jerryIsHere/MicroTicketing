import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../service/api.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-show-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.sass'
})
export class ShowListComponent {
  public shows: Show[] = [];
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
