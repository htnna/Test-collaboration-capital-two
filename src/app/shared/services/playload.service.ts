import { Injectable } from '@angular/core';
import { Brand } from '../models/brand';
import { PlayloadRmp } from '../models/playload-rmp';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayloadService {
  private _jsonURL = 'assets/data/';

  constructor(private http: HttpClient) {}

  public getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this._jsonURL + 'brands.json');
  }

  public getPlayloadRmp(): Observable<PlayloadRmp> {
    return this.http.get<PlayloadRmp>(this._jsonURL + 'payload-rmp.json');
  }
}
