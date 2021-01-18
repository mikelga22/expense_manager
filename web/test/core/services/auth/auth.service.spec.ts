import {TestBed} from "@angular/core/testing";

import {AuthService} from "../../../../src/app/core/services/auth/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {UserService} from "../../../../src/app/core/services/user/user.service";
import {User} from "../../../../src/app/core/models/user/user";
import {of} from "rxjs";

const userStub = {
  name: "name",
  email: "email@email.com"
};

const dataStub = {
  data: () => userStub
};

const resp = {
  user: {
    uid: "1234"
  }
};

const fireUserStub = {
  email: "email@email.com",
  uid: "1234"
};

let userState = null;

const authStateStub = of(userState);

const UserServiceStub = {
  getUser: () => new Promise((resolve) => resolve(dataStub))
};

const AngularFireAuthStub = {
  signInWithEmailAndPassword: (email, password) => {
    if (email === "email" && password === "password") {
      userState = fireUserStub;
      return new Promise((resolve) => resolve(resp));
    } else {
      return new Promise((resolve, reject) => reject("Bad login"));
    }
  },

  signOut: () => new Promise((resolve) => {
    userState = null;
    resolve(true);
  }),

  authState: authStateStub
};

describe("AuthService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: AngularFireAuth, useValue: AngularFireAuthStub},
      {provide: UserService, useValue: UserServiceStub}
    ]
  }));

  it("should be created", () => {
    const service: AuthService = TestBed.inject(AuthService);
    expect(service).toBeTruthy();
  });

  it("#login(email, password) should return true", async () => {
    const service: AuthService = TestBed.inject(AuthService);
    const login = await service.login("email", "password");

    expect(login).toBeTrue();
  });

  it("#login(email, password) should return false when login fail", async () => {
    const service: AuthService = TestBed.inject(AuthService);

    const login = await service.login("wrongEmail", "wrongPass");
    expect(login).toBeFalse();
  });

  it("#onStateChange() should return user if logged", async () => {
    const expected: User = new User();
    let current: User = null;

    expected.id = "1234";
    expected.name = "name";
    expected.email = "email@email.com";

    const service: AuthService = TestBed.inject(AuthService);

    await service.login("email", "password");

    service.onStateChange().subscribe((user) => expect(user).toEqual(expected));
  });

  // it("#getUser() should return null if not logged", async () => {
  //   const service: AuthService = TestBed.inject(AuthService);
  //   const current = service.getUser();
  //
  //   expect(current).toBeNull();
  // });

  it("#isLoggedIn() should return true if logged", async () => {
    const service: AuthService = TestBed.inject(AuthService);
    await service.login("email", "password");
    const logged = service.isLoggedIn();

    expect(logged).toBeTrue();
  });

  it("#isLoggedIn() should return false if not logged", async () => {
    const service: AuthService = TestBed.inject(AuthService);
    const logged = service.isLoggedIn();

    expect(logged).toBeFalse();
  });

  it("#logout() should return true", async () => {
    const service: AuthService = TestBed.inject(AuthService);
    const logout = await service.logOut();

    expect(logout).toBeTrue();
  });
});
