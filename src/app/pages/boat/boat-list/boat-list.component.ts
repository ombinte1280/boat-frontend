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
import {DatePipe} from '@angular/common';
import {CategoryNamePipe} from '../../../shared/pipe/category-name.pipe';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from '../../../shared/service/notification.service';


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
    MatButton,
    DatePipe,
    CategoryNamePipe
  ],
  templateUrl: './boat-list.component.html',
  styleUrl: './boat-list.component.scss',
  standalone: true
})
export class BoatListComponent implements OnInit {

  boats: BoatModel[] = [];
  displayedColumns: string[] = ['position', 'name', 'category', 'registration', 'creationDate', 'actions'];

  constructor(private boatService: BoatService, private router: Router, private notificationService: NotificationService
  , private snackBar: MatSnackBar) {
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
    this.router.navigate(['/boat-detail', boat.id]);
  }

  deleteBoat(boat: BoatModel) {
    const snackBarRef = this.snackBar.open(
      `Supprimer le bateau "${boat.name}" ?`,
      'Supprimer',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      }
    );

    snackBarRef.onAction().subscribe(() => {
      this.boatService.deleteBoat(boat.id).subscribe({
        next: () => {
          this.notificationService.showSuccess(`Bateau "${boat.name}" supprimé`);
          this.reloadList();
        },
        error: err => {
          console.error('Error when deleting', err);
          this.notificationService.showError('Erreur lors de la suppression');
        }
      });
    });
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
