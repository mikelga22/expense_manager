import {Component, OnDestroy, OnInit} from "@angular/core";
import {AuthService} from "../../core/services/auth/auth.service";
import {SessionService} from "../../core/services/session/session.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit, OnDestroy {

  model: any = {
    email: "",
    password: ""
  };

  constructor(private authService: AuthService, private sessionService: SessionService, private router: Router) {
  }

  ngOnInit() {
    // this is a test for github integration
  }

  logIn() {
    this.authService.login(this.model.email, this.model.password).then((value) => {
      if (value) {
        this.router.navigate(["/"]);
      }
    });
  }

  logOut() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
  }
}
