import {fireEvent, render, screen} from '@testing-library/angular';
import {AuthLoginComponent} from './auth-login.component';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {of, throwError} from 'rxjs';

describe('AuthLoginComponent (Jest)', () => {
  const mockAuthService = {
    login: jest.fn()
  };

  const mockRouter = {
    navigateByUrl: jest.fn()
  };

  const mockSnackBar = {
    open: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create', async () => {
    const { fixture } = await render(AuthLoginComponent, {
      providers: [
        { provide: AuthenticationService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    });

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should call login and navigate on success', async () => {
    const mockUser = {
      token: 'fake-token',
      firstname: 'user1',
      lastname: 'user1'
    };

    mockAuthService.login.mockReturnValue(of(mockUser));

    const { fixture } = await render(AuthLoginComponent, {
      providers: [
        { provide: AuthenticationService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    });

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    const loginButton = screen.getByRole('button', { name: /Connexion/i });

    fireEvent.input(usernameInput, { target: { value: 'user1' } });
    fireEvent.input(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    expect(mockAuthService.login).toHaveBeenCalledWith({
      username: 'user1',
      password: 'password'
    });

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/boat-list');
  });

  it('should show error on login failure', async () => {
    mockAuthService.login.mockReturnValue(
      throwError(() => ({ response: { data: { errors: ['Invalid credentials'] } } }))
    );

    const { fixture } = await render(AuthLoginComponent, {
      providers: [
        { provide: AuthenticationService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    });

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    const loginButton = screen.getByRole('button', { name: /Connexion/i });

    fireEvent.input(usernameInput, { target: { value: 'baduser' } });
    fireEvent.input(passwordInput, { target: { value: 'badpass' } });
    fireEvent.click(loginButton);

    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Identifiants incorrects',
      'Fermer',
      expect.objectContaining({
        duration: 4000,
        panelClass: ['snackbar-error']
      })
    );
  });
});
