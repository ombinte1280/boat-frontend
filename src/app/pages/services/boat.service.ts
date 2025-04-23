import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {BoatModel} from '../boat/models/boat.model';
import {BoatRequest} from '../boat/models/request/boat-request';

@Injectable({
  providedIn: 'root'
})
export class BoatService {

  private boatBaseUrl = environment.baseUrl + '/boats';

  constructor(private http: HttpClient) {
  }

  getAllBoats(): Observable<BoatModel[]> {
    return this.http.get<BoatModel[]>(this.boatBaseUrl).pipe(
      catchError(error => {
        console.error('/GET all Boat api error', error);
        return throwError(() => error);
      })
    );
  }

  getBoat(id: string): Observable<BoatModel> {
    return this.http.get<BoatModel>(this.boatBaseUrl + '/'+id).pipe(
      catchError(error => {
        console.error('/GET Boat api error', error);
        return throwError(() => error);
      })
    );
  }

  createBoat(request: BoatRequest): Observable<BoatModel> {
    return this.http.post<BoatModel>(this.boatBaseUrl, request).pipe(
      catchError(error => {
        console.error('/POST Boat API error', error);
        return throwError(() => error);
      })
    );
  }

  patchBoat(request: BoatRequest): Observable<BoatModel> {
    return this.http.patch<BoatModel>(this.boatBaseUrl, request).pipe(
      catchError(error => {
        console.error('/PATCH Boat API error', error);
        return throwError(() => error);
      })
    );
  }

  deleteBoat(id: string): Observable<void> {
    return this.http.delete<void>(this.boatBaseUrl + '/'+id).pipe(
      catchError(error => {
        console.error('/DELETE Boat api error', error);
        return throwError(() => error);
      })
    );
  }
}
