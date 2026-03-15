import { TestBed } from '@angular/core/testing';

import { WadCommandLogService } from './log.service';

describe('WadCommandLogService', () => {
  let service: WadCommandLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WadCommandLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
