import {render, waitFor} from '@testing-library/angular';
import {BoatDetailComponent} from './boat-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {BoatService} from '../../services/boat.service';

describe('BoatDetailComponent', () => {
  let mockBoatService = {
    getBoat: jest.fn(),
    patchBoat: jest.fn(),
    createBoat: jest.fn()
  };

  let mockRouter = {
    navigate: jest.fn()
  };

  const activatedRouteMock = {
    paramMap: of({
      get: () => '123'
    })
  };

  const mockBoat = {
    id: '123',
    name: 'MockBoat',
    category: 'SAILBOAT',
    registration: 'XX123',
    description: 'Nice boat',
    creationDate: '2023-01-01'
  };

  beforeEach(() => {
    mockBoatService.getBoat.mockReturnValue(of(mockBoat));
    mockBoatService.patchBoat.mockReturnValue(of({}));
    mockBoatService.createBoat.mockReturnValue(of({}));
  });

  it('should render and populate the form in edit mode', async () => {
    const { fixture } = await render(BoatDetailComponent, {
      componentProperties: {},
      providers: [
        { provide: BoatService, useValue: mockBoatService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
      imports: [ReactiveFormsModule]
    });

    await waitFor(() => {
      expect(fixture.componentInstance.boatForm.value.name).toBe('MockBoat');
    });
  });

  it('should call patchBoat on form submit if id exists', async () => {
    const { fixture } = await render(BoatDetailComponent, {
      providers: [
        { provide: BoatService, useValue: mockBoatService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
      imports: [ReactiveFormsModule]
    });

    const component = fixture.componentInstance;
    component.boat = mockBoat;

    component.boatForm.setValue({
      name: 'UpdatedBoat',
      category: 'SAILBOAT',
      registration: 'XX123',
      description: 'Updated',
      creationDate: '2023-01-01'
    });

    component.onSubmit();

    expect(mockBoatService.patchBoat).toHaveBeenCalledWith('123', expect.any(Object));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/boat-list']);
  });
});
