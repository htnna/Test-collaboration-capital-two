import { TestBed } from '@angular/core/testing';

import { PlayloadService } from './playload.service';

describe('PlayloadService', () => {
  let service: PlayloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
