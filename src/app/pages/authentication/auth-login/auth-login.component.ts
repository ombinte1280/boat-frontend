import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginModel} from '../models/login.model';
import {UserModel} from '../models/user.model';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth-login',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton
  ],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss',
  standalone: true
})
export class AuthLoginComponent {

  loginForm: FormGroup;
  validationErrors:any = []

  constructor(private fb: FormBuilder, private authService: AuthenticationService
    , private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if(this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const loginModel: LoginModel = {
        username: formValue.username,
        password: formValue.password
      }

      this.authService.login(loginModel).subscribe({
        next: (user: UserModel) => {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', user.firstname + ' ' + user.lastname);
          this.router.navigateByUrl('/boat-list');
        },
        error: err => {
          console.log('Login failed:', err);
          this.snackBar.open('Identifiants incorrects', 'Fermer', {
            duration: 4000,
            panelClass: ['snackbar-error'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.validationErrors = err.response ? err.response.data.errors : err;
        }
      });
    }
  }
}
