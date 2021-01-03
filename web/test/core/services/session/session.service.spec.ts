import { TestBed } from '@angular/core/testing';

import { SessionService } from '../../../../src/app/core/services/session/session.service';
import {User} from '../../../../src/app/core/models/user/user';

describe('SessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionService = TestBed.inject(SessionService);
    expect(service).toBeTruthy();
  });

  it('#newSession() should start new session', () => {
    const service: SessionService = TestBed.inject(SessionService);
    const user = new User();
    user.id = '1234';

    service.getState().subscribe(u => expect(u).toEqual(user));
    service.newSession(user);
  });

  it('#endSession() should start new session', () => {
    const service: SessionService = TestBed.inject(SessionService);
    const user = new User();
    user.id = '1234';

    service.newSession(user);
    service.getState().subscribe(u => {
      expect(u).toEqual(null);
    });
    service.endSession();
  });
});
