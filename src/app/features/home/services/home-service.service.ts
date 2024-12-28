import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeRepository } from '../repository/home.repository';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

   constructor(
        private _repository: HomeRepository
      ) {
    }


    public getPhotos(): Observable<any> {
        return this._repository.getPhotos();
    }
}
