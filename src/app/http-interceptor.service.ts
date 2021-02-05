import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class HttpInterceptorService {
    constructor(){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
       const isMatch = request.url.includes(environment.apiUrl);
       if(isMatch){
           request = request.clone({
               setHeaders: {
                'Content-Type': 'application/json',
                }
           });
       }
       return next.handle(request).pipe(catchError( (error: HttpErrorResponse) =>{
          return throwError(error)
       }));
    }
}