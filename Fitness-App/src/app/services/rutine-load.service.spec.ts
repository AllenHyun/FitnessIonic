import { TestBed } from '@angular/core/testing';

import { RutineLoadService } from './rutine-load.service';

describe('RutineLoadService', () => {
  let service: RutineLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutineLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
