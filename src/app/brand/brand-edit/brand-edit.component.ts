import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, forkJoin, Subject, takeUntil } from 'rxjs';
import { Campagne, Media } from 'src/app/shared/models/playload-rmp';
import { PlayloadService } from 'src/app/shared/services/playload.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Brand } from 'src/app/shared/models/brand';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.scss'],
})
export class BrandEditComponent implements OnDestroy {
  brands?: Brand[];
  request?: Campagne;
  currentId?: number;
  requestForm?: FormGroup;
  mediaList?: Media[];
  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private playloadService: PlayloadService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.requestForm = this.fb.group({
      brand: new FormControl('', [Validators.required]),
      campaignName: new FormControl('', [Validators.required]),
      media: new FormControl([], [Validators.required]),
      decisionDeadline: new FormControl('', [Validators.required]),
    });
    forkJoin([
      this.playloadService.getPlayloadRmp(),
      this.playloadService.getBrands(),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([playload, brands]) => {
          if (playload && brands) {
            this.brands = brands;
            if (playload?.requests) {
              const id =
                this.activatedRoute.snapshot.paramMap?.get('requestId');
              if (id) {
                this.currentId = Number(id);
              }
              this.request = playload?.requests.find(
                (r) => r.requestId === this.currentId
              );
              this.mediaList = [];
              playload?.requests.forEach((r) => {
                r.media?.forEach((rm) => {
                  if (!this.mediaList?.find((m) => m.mediaId === rm.mediaId))
                    this.mediaList?.push(...(r.media ?? []));
                });
              });
              if (this.request) {
                this.requestForm?.get('brand')?.setValue(this.request.brand);
                this.requestForm
                  ?.get('campaignName')
                  ?.setValue(this.request.campaignName);
                this.requestForm?.get('media')?.setValue(this.request.media);
                this.requestForm
                  ?.get('decisionDeadline')
                  ?.setValue(this.request.decisionDeadline);
              }
            }
          }
        },
      });
  }

  save() {
    this.requestForm?.markAllAsTouched();
    this.requestForm?.updateValueAndValidity();
    if (this.requestForm?.valid && this.requestForm.value) {
      const request = { ...this.request };
      request.brand = this.requestForm.value.brand;
      request.campaignName = this.requestForm.value.campaignName;
      request.media = this.requestForm.value.media;
      request.decisionDeadline = this.requestForm.value.decisionDeadline;
      this.playloadService.setRequestInPlayload(request);
      this.router.navigate(['brand']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
