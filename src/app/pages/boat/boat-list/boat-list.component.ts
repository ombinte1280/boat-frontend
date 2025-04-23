import {Component, OnInit} from '@angular/core';
import {BoatService} from '../../services/boat.service';
import {Router} from '@angular/router';
import {BoatModel} from '../models/boat.model';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-boat-list',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatIconButton,
    MatIcon,
    MatButton
  ],
  templateUrl: './boat-list.component.html',
  styleUrl: './boat-list.component.scss',
  standalone: true
})
export class BoatListComponent implements OnInit {

  boats: BoatModel[] = [];
  displayedColumns: string[] = ['position', 'name', 'category', 'actions'];

  constructor(private boatService: BoatService, private router: Router) {
  }

  ngOnInit(): void {

    this.boatService.getAllBoats().subscribe({
      next: (response: BoatModel[]) => {
        this.boats = response;
      },
      error: (err) => {
        console.error('Error when trying to getting list of boats', err);
      }
    });
  }

  editBoat(boat: BoatModel) {
    this.router.navigate(['/boat-detail'], { state: { boat } });
  }

  deleteBoat(boat: BoatModel) {
    if (confirm(`Supprimer le bateau "${boat.name}" ?`)) {
      this.boatService.deleteBoat(boat.id).subscribe({
        next: () => this.reloadList(),
        error: err => console.error('Error when deleting', err)
      });
    }
  }

  addBoat() {
    this.router.navigate(['/boat-detail']);
  }

  reloadList() {
    this.boatService.getAllBoats().subscribe({
      next: boats => this.boats = boats
    });
  }
}
