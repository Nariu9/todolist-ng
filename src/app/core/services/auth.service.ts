import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonResponse } from '../models/core.model';
import { Router } from '@angular/router';
import { ResultCodeEnum } from '../enums/resultCodeEnum';
import { LoginRequestData, MeResponse } from '../models/auth.models';
import { catchError, EMPTY } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable()
export class AuthService {
  isAuth = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/ban-types
  resolveMeRequest: Function = () => {};
  meRequest = new Promise(res => {
    this.resolveMeRequest = res;
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  login(data: LoginRequestData) {
    this.http
      .post<CommonResponse<{ userId: number }>>(`${environment.baseURL}/auth/login`, data)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/']);
        } else {
          this.notificationService.handleError(res.messages[0]);
        }
      });
  }

  logout() {
    this.http
      .delete<CommonResponse>(`${environment.baseURL}/auth/login`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/login']);
        }
      });
  }

  me() {
    this.http
      .get<CommonResponse<MeResponse>>(`${environment.baseURL}/auth/me`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.isAuth = true;
        }
        this.resolveMeRequest();
      });
  }

  private errorHandler(error: HttpErrorResponse) {
    this.notificationService.handleError(error.message);
    return EMPTY;
  }
}
