import { TestBed } from '@angular/core/testing';

import { SelectedAnchorsService } from './selected-anchors.service';

describe('SelectedAnchorsService', () => {
  let service: SelectedAnchorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedAnchorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
