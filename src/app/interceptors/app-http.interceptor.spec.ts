import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppHttpInterceptor } from './app-http.interceptor';
import { AuthService } from '../services/auth.service';

describe('AppHttpInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
      ]
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => httpMock.verify());

  it('should add the Bearer token to API requests', () => {
    authService.accessToken = 'my-token';
    http.get('/customers').subscribe();
    const req = httpMock.expectOne('/customers');
    expect(req.request.headers.get('Authorization')).toBe('Bearer my-token');
    req.flush([]);
  });

  it('should not add the token to the login request', () => {
    authService.accessToken = 'my-token';
    http.post('/auth/login', {}).subscribe();
    const req = httpMock.expectOne('/auth/login');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });
});
