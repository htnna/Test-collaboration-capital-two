import { Injectable, OnDestroy } from '@angular/core';
import { Brand } from '../models/brand';
import { Campagne, PlayloadRmp } from '../models/playload-rmp';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayloadService implements OnDestroy {
  private _jsonURL = 'assets/data/';
  brands$?: BehaviorSubject<Brand[] | null>;
  playloadRmp$?: BehaviorSubject<PlayloadRmp | null>;

  constructor(private http: HttpClient) {}

  setRequestInPlayload(request: Campagne) {
    if (this.playloadRmp$?.value) {
      const playload = this.playloadRmp$.value;
      if (playload.requests) {
        const i = playload.requests.findIndex(
          (r) => r.requestId === request.requestId
        );
        if (i != undefined && i >= 0) {
          playload.requests[i] = request;
        }
        this.playloadRmp$.next(playload);
      }
    }
  }

  public getBrands(): Observable<Brand[] | null> {
    if (!this.brands$) {
      this.brands$ = new BehaviorSubject<Brand[] | null>(null);
      this.http
        .get<Brand[]>(this._jsonURL + 'brands.json')
        .subscribe((brands) => {
          this.brands$?.next(brands);
        });
    }
    return this.brands$.asObservable();
  }

  public getPlayloadRmp(): Observable<PlayloadRmp | null> {
    if (!this.playloadRmp$) {
      this.playloadRmp$ = new BehaviorSubject<PlayloadRmp | null>(null);
      this.http
        .get<PlayloadRmp>(this._jsonURL + 'payload-rmp.json')
        .subscribe((playload) => {
          this.playloadRmp$?.next(playload);
        });
    }
    return this.playloadRmp$.asObservable();
  }

  ngOnDestroy(): void {
    this.brands$?.complete();
    this.playloadRmp$?.complete();
  }
}
