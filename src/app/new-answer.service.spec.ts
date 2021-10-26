import { TestBed } from '@angular/core/testing';

import { SubmitAnswerService } from './new-answer/submit-answer.service';

describe('NewAnswerService', () => {
  let service: SubmitAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
