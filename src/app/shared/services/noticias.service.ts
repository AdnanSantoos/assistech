import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, of, shareReplay, tap } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class NoticiasService {
    private cachedData: any;
     private apiUrl = `${environment.API_URL}/public/news`;
  
     private readonly data$ = this.http.get<any>(this.apiUrl)
     .pipe(
       shareReplay(1),
     );
 
   constructor(private http: HttpClient) {}
 
   getLatestNews() {
    console.log('trouxe o data')
     return this.data$;
   }
  }