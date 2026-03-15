import { TestBed } from '@angular/core/testing';
import { WadElementService } from './element.service';

describe('WadElementService', () => {
  let service: WadElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
    });
    service = TestBed.inject(WadElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
