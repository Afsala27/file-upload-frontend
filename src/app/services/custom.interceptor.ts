import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class customInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request body is of type FormData (multipart form data)
    if (req.body instanceof FormData) {
      // Append authorization header
      const token = localStorage.getItem('logintoken');
      
      // Clone the request and set the Authorization header
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Pass the request to the next interceptor or handler
    return next.handle(req);
  }
}
