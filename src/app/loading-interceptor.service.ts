import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor {

  constructor(private loadingBar: LoadingBarService) { }
  loader = this.loadingBar.useRef();
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.includes(environment.baseUrl))
    { 
      this.showLoader()
      return next.handle(req).pipe(tap((event: HttpEvent<any>) => { 
        if (event instanceof HttpResponse) {
          this.hideLoader();
        }
      },
        (err: any) => {
          this.hideLoader();
      }));
    
    }
    return next.handle(req);  
  }
  private showLoader(): void {
    this.loader.start();
  }
  private hideLoader(): void {
    this.loader.complete();
  }

}
