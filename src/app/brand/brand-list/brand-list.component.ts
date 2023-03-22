import { Component, OnDestroy } from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { Brand } from 'src/app/shared/models/brand';
import { PlayloadRmp } from 'src/app/shared/models/playload-rmp';
import { PlayloadService } from 'src/app/shared/services/playload.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
})
export class BrandListComponent implements OnDestroy {
  playload?: PlayloadRmp;
  brands?: Brand[];
  brandNames?: any[];
  private destroy$ = new Subject();

  constructor(private playloadService: PlayloadService) {
    combineLatest([
      this.playloadService.getPlayloadRmp(),
      this.playloadService.getBrands(),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([playload, brands]) => {
          if (playload && brands) {
            this.playload = playload;
            this.brands = brands;
            this.brandNames = brands.map((b) => {
              return {
                label: b.name,
                value: b.name,
              };
            });
          }
        },
      });
  }

  getOrdinalDay(d: string) {
    let dateNew = new Date(d),
      day = dateNew.getDate(),
      ordinal = 'th';
    if (day == 2 || day == 22) ordinal = 'nd';
    if (day == 3 || day == 23) ordinal = 'rd';
    if (day == 21 || day == 1 || day == 31) ordinal = 'st';
    return d ? ordinal : '';
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
