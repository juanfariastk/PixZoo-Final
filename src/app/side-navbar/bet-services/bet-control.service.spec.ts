import { TestBed } from '@angular/core/testing';

import { BetControlService } from './bet-control.service';

describe('BetControlService', () => {
  let service: BetControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
