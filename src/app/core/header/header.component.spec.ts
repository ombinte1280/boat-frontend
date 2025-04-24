import { render, screen, fireEvent } from '@testing-library/angular';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let mockRouter: { navigateByUrl: jest.Mock };

  beforeEach(() => {
    mockRouter = {
      navigateByUrl: jest.fn()
    };
    localStorage.clear();
  });

  it('should render and redirect to /login if no user in localStorage', async () => {
    await render(HeaderComponent, {
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    });

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should display the username if user is in localStorage', async () => {
    localStorage.setItem('user', 'User1');

    await render(HeaderComponent, {
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    });

    expect(screen.getByText('User1')).toBeTruthy();
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should clear localStorage and navigate to login on logout', async () => {
    localStorage.setItem('user', 'User1');
    localStorage.setItem('token', 'abc123');

    const { fixture } = await render(HeaderComponent, {
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    });

    fixture.componentInstance.logout();

    expect(localStorage.getItem('user')).toBe('');
    expect(localStorage.getItem('token')).toBe('');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
