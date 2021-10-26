import { TestBed } from '@angular/core/testing';

import { SubmitQuestionService } from './new-question/submit-question.service';

describe('SubmitQuestionService', () => {
  let service: SubmitQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
