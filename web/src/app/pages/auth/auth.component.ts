import {Component, OnDestroy, OnInit} from "@angular/core";
import {AuthService} from "../../core/services/auth/auth.service";
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

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {}

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
