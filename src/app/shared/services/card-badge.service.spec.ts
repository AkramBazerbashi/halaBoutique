import { TestBed } from '@angular/core/testing';

import { CardBadgeService } from './card-badge.service';

describe('CardBadgeService', () => {
  let service: CardBadgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardBadgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
