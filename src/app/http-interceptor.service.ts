import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class HttpInterceptorService {
    constructor(){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
       const isMatch = request.url.includes('http://localhost:8080/');
       if(isMatch){
           console.log(isMatch);
           request = request.clone({
               url: "https://api.spaceXdata.com/v3/launches",
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