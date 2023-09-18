import { TestBed } from '@angular/core/testing';

import { AddFilterService } from './add-filter.service';

describe('AddFilterService', () => {
  let service: AddFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
