import { TestBed } from '@angular/core/testing';

import { Intl } from './intl';

describe('Intl', () => {
  let service: Intl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Intl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
