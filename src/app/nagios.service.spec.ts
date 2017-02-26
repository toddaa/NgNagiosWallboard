import { TestBed, inject } from '@angular/core/testing';

import { NagiosService } from './nagios.service';

describe('NagiosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NagiosService]
    });
  });

  it('should ...', inject([NagiosService], (service: NagiosService) => {
    expect(service).toBeTruthy();
  }));
});
