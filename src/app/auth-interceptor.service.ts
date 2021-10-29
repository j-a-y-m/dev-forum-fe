import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {mergeMap} from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService : AuthService, private fbAuth : AngularFireAuth) { }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //var newReq = req ;
    if(req.url.includes(environment.baseUrl))
    {
      console.log("interceptor") ;

      //check auth status

      return this.fbAuth.idToken.pipe(mergeMap((idToken)=>
      {
        if(idToken)
        {
          const newReq = req.clone({
                    headers: req.headers.set('Authorization', idToken)
                  });
          return  next.handle(newReq);
        }else
        {
          return  next.handle(req);
        }
      }))



      //   .subscribe({
      //   next : async (user)=>{
      //     if (user)
      //     {
      //       var idToken = await user.getIdToken(true);
      //       //console.log("interceptor token "+idToken);
      //       newReq = req.clone({
      //         headers: req.headers.set('Authorization', idToken)
      //       });
      //       console.log("newReq "+newReq.headers.get('Authorization'));
      //               return next.handle(newReq);
      //     }else
      //     {
      //       console.log("user null");
      //       return next.handle(newReq);
      //     }
      //   }
      // })




    }
     // console.log(req.url +" no header interceptor");

    return next.handle(req);
  }


}
