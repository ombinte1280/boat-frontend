import { Component } from '@angular/core';
import {MatDivider} from '@angular/material/divider';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-layout',
  imports: [
    MatDivider,
    MatToolbar,
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
