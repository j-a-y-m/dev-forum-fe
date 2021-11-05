import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponseInterceptorService implements HttpInterceptor{

  constructor(private snackbar : MatSnackBar) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.includes(environment.baseUrl))
    {
      return next.handle(req).pipe(tap((event: HttpEvent<any>) => { 
        if (event instanceof HttpResponse) {
          if(event.ok && event.body.message){
            this.snackbar.open(event.body.message, "OK", {
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
              duration: 3000
            });
            // event.body?.message
          }
        }
      },
        (err: HttpErrorResponse) => {
          if(err.error.error)
          {
            this.snackbar.open(err.error.error, "OK", {
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
              duration: 3000
            });
          }else{
            this.snackbar.open("error occured", "OK", {
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
              duration: 3000
            });
            console.log(err);
          }
          
      }));
    }else
    return next.handle(req);
  }
}
