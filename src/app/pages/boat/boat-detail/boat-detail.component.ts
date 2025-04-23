import {Component, OnInit} from '@angular/core';
import {BoatService} from '../../services/boat.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {BoatModel} from '../models/boat.model';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryItem, CategoryItemsSorted} from '../../../core/models/category.item';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {BoatRequest} from '../models/request/boat-request';
import {DatePipe, NgForOf, NgIf} from '@angular/common';


@Component({
  selector: 'app-boat-detail',
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    RouterLink,
    NgForOf,
    DatePipe,
    NgIf
  ],
  templateUrl: './boat-detail.component.html',
  styleUrl: './boat-detail.component.scss',
  standalone: true
})
export class BoatDetailComponent implements OnInit{

  boat: BoatModel | undefined;
  boatForm: FormGroup;
  categories: CategoryItem[] = CategoryItemsSorted;
  validationErrors:any = [];
  isViewMode = false;

  constructor(private fb: FormBuilder, private boatService: BoatService, private router: Router
    , private route: ActivatedRoute) {
    this.boatForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', Validators.required],
      registration: ['', Validators.required],
      description: [''],
      creationDate: ['']
    });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isViewMode = history.state?.viewMode === true;

      if (id) {
        this.boatService.getBoat(id).subscribe(boat => {

          // Mode to check boat détails
          if (this.isViewMode) {
            this.boatForm.disable();
          }

          this.boat = boat;
          this.boatForm.patchValue({
            name: boat.name,
            category: boat.category,
            registration: boat.registration,
            description: boat.description,
            creationDate: boat.creationDate
          });
        });
      }
    });
  }

  onSubmit(): void {
    if(this.boatForm.valid) {

      const formValues = this.boatForm.value;
      const boatId = this.boat?.id;

      const request: BoatRequest = {
        name: formValues.name,
        category: formValues.category,
        registration: formValues.registration,
        description: formValues.description
      }

      if (boatId) { // Edition of a boat
        this.boatService.patchBoat(boatId, request).subscribe({
          next: () => this.router.navigate(['/boat-list']),
          error: err => {
            console.error('Error when updating boat', err);
            this.validationErrors = err.response ? err.response.data.errors : err;
          }
        });
      } else { // Creation of new boat
        this.boatService.createBoat(request).subscribe({
          next: () => this.router.navigate(['/boat-list']),
          error: err => {
            console.error('Error when creating new boat', err);
            this.validationErrors = err.response ? err.response.data.errors : err;
          }
        });
      }
    }
  }
}
