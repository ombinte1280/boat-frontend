import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../authentication/models/login.model';
import {catchError, Observable, throwError} from 'rxjs';
import {UserModel} from '../authentication/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authBaseUrl = environment.baseUrl + '/users';

  constructor(private http: HttpClient) {
  }

  login(login: LoginModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.authBaseUrl +'/login', login).pipe(
      catchError(error => {
        console.error('Login API error', error);
        return throwError(() => error);
      })
    );
  }

}
