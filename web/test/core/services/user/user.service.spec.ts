import {TestBed} from '@angular/core/testing';

import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from '../../../../src/app/core/services/user/user.service';


const DocumentReferenceStub = {
  get: (d: any) => new Promise((resolve) => resolve(true))
};

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (id: string) => ({
      ref: DocumentReferenceStub
    }),
  }),
};

describe('UserService', () => {
  // let angularFirestore: AngularFirestore;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFirestore, useValue: FirestoreStub }
    ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.inject(UserService);
    expect(service).toBeTruthy();
  });

  it('#getUser() should return User', async () => {
    const service: UserService = TestBed.inject(UserService);
    const current = await service.getUser('12234');
    expect(current).toBeTrue();
  });
});
