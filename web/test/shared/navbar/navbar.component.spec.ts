import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {NavbarComponent} from "../../../src/app/shared/layout/navbar/navbar.component";
import {Observable} from "rxjs";
import {AuthService} from "../../../src/app/core/services/auth/auth.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {NbUserModule} from "@nebular/theme";
import {Router} from "@angular/router";

const userStub = {
  name: "name",
  email: "email@email.com",
  uid: "1234"
};

const AuthServieStub = {
  onStateChange: () => new Observable((observer) => {
    observer.next(userStub);
  }),

  logOut: () => true
};

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NbUserModule],
      declarations: [NavbarComponent],
      providers: [
        {provide: AuthService, useValue: AuthServieStub}
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ]
    })
      .compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(NavbarComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  //
  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
