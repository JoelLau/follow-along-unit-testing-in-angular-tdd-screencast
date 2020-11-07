import { TestBed } from '@angular/core/testing';
import { ApiCallService } from './api-call.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiCallService', () => {
  let service: ApiCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
