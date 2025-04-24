import {render} from '@testing-library/angular';
import {BoatListComponent} from './boat-list.component';
import {BoatService} from '../../services/boat.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from '../../../shared/service/notification.service';
import {of, throwError} from 'rxjs';

describe('BoatListComponent', () => {
  let mockBoatService: jest.Mocked<BoatService>;
  let mockRouter: jest.Mocked<Router>;
  let mockSnackBar: jest.Mocked<MatSnackBar>;
  let mockNotification: jest.Mocked<NotificationService>;

  const mockBoats = [
    { id: '1', name: 'Test Boat', category: 'SAILBOAT', registration: 'XX123', creationDate: new Date() }
  ];


  beforeEach(async () => {
    mockBoatService = {
      getAllBoats: jest.fn().mockReturnValue(of([])),
      deleteBoat: jest.fn()
    } as any;

    mockRouter = {
      navigate: jest.fn()
    } as any;

    mockSnackBar = {
      open: jest.fn()
    } as any;

    mockNotification = {
      showSuccess: jest.fn(),
      showError: jest.fn()
    } as any;
  });

  it('should create', async () => {
    const { fixture } = await render(BoatListComponent, {
      providers: [
        { provide: BoatService, useValue: mockBoatService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: NotificationService, useValue: mockNotification }
      ]
    });

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load boats on init', async () => {
    mockBoatService.getAllBoats.mockReturnValue(of(mockBoats));

    const { fixture } = await render(BoatListComponent, {
      providers: [
        { provide: BoatService, useValue: mockBoatService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: NotificationService, useValue: mockNotification }
      ]
    });

    expect(mockBoatService.getAllBoats).toHaveBeenCalled();
    expect(fixture.componentInstance.boats.length).toBe(1);
  });

  it('should call router to edit boat', async () => {
    const { fixture } = await render(BoatListComponent, {
      providers: [
        { provide: BoatService, useValue: mockBoatService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: NotificationService, useValue: mockNotification }
      ]
    });

    const boat = mockBoats[0];
    fixture.componentInstance.editBoat(boat);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/boat-detail', boat.id]);
  });

  it('should call router to add new boat', async () => {
    const { fixture } = await render(BoatListComponent, {
      providers: [
        { provide: BoatService, useValue: mockBoatService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: NotificationService, useValue: mockNotification }
      ]
    });

    fixture.componentInstance.addBoat();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/boat-detail']);
  });

  it('should navigate to view mode', async () => {
    const { fixture } = await render(BoatListComponent, {
      providers: [
        { provide: BoatService, useValue: mockBoatService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: NotificationService, useValue: mockNotification }
      ]
    });

    const boat = mockBoats[0];
    fixture.componentInstance.viewBoat(boat);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/boat-detail', boat.id], { state: { viewMode: true } });
  });

  it('should handle delete confirmation and success', async () => {
    const mockSnackRef = {
      onAction: () => of(true)
    } as any;

    mockSnackBar.open.mockReturnValue(mockSnackRef);
    mockBoatService.deleteBoat.mockReturnValue(of(void 0));
    mockBoatService.getAllBoats.mockReturnValue(of([]));

    const { fixture } = await render(BoatListComponent, {
      providers: [
        { provide: BoatService, useValue: mockBoatService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: NotificationService, useValue: mockNotification }
      ]
    });

    fixture.componentInstance.deleteBoat(mockBoats[0]);

    expect(mockSnackBar.open).toHaveBeenCalled();
    expect(mockBoatService.deleteBoat).toHaveBeenCalledWith(mockBoats[0].id);
    expect(mockNotification.showSuccess).toHaveBeenCalled();
  });

  it('should handle delete error', async () => {
    const mockSnackRef = {
      onAction: () => of(true)
    } as any;

    mockSnackBar.open.mockReturnValue(mockSnackRef);
    mockBoatService.deleteBoat.mockReturnValue(throwError(() => new Error('Delete error')));

    const { fixture } = await render(BoatListComponent, {
      providers: [
        { provide: BoatService, useValue: mockBoatService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: NotificationService, useValue: mockNotification }
      ]
    });

    fixture.componentInstance.deleteBoat(mockBoats[0]);

    expect(mockNotification.showError).toHaveBeenCalledWith('Erreur lors de la suppression');
  });

});
