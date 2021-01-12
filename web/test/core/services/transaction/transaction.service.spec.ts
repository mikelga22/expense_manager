import {TestBed} from "@angular/core/testing";

import {TransactionService} from "../../../../src/app/core/services/transaction/transaction.service";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../../../src/app/core/models/user/user";
import {AuthService} from "../../../../src/app/core/services/auth/auth.service";
import {Transaction} from "../../../../src/app/core/models/transaction/transaction";

const AuthServieStub = {
  getUser: () => {
    const user = new User();
    user.id = "1234";
    return user;
  }
};

const DocumentStub = {
  delete: () => new Promise((resolve) => resolve(true)),
  collection: (name: string) => CollectionStub
};

const CollectionStub = {
  stateChanges: () => new Observable((observer) => {
    observer.next(true);
    observer.complete();
  }),
  add: (transaction: any) => new Promise((resolve) => resolve(true)),
  doc: (id: string) => DocumentStub
};

const FirestoreStub = {
  collection: (name: string) => CollectionStub,
  doc: (id: string) => DocumentStub
};

describe("TransactionService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: AngularFirestore, useValue: FirestoreStub},
      {provide: AuthService, useValue: AuthServieStub}
    ]
  }));

  it("should be created", () => {
    const service: TransactionService = TestBed.inject(TransactionService);
    expect(service).toBeTruthy();
  });

  it("#getSubscription() should return subscription", () => {
    const service: TransactionService = TestBed.inject(TransactionService);
    service.getSubscription().subscribe((value => expect(value).toBeTrue()));
  });

  it("#add() should add Transaction", async () => {
    const transaction = new Transaction();
    const service: TransactionService = TestBed.inject(TransactionService);
    const current = await service.add(transaction);
    expect(current).toBeTrue();
  });

  it("#delete() should delete Transaction", async () => {
    const service: TransactionService = TestBed.inject(TransactionService);
    const current = await service.delete("1234");
    expect(current).toBeTrue();
  });
});
