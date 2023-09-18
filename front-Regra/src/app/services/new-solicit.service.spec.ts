import { TestBed } from '@angular/core/testing';

import { NewSolicitService } from './new-solicit.service';

describe('NewSolicitService', () => {
  let service: NewSolicitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewSolicitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
