import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {User} from "../../../core/models/user/user";
import {AuthService} from "../../../core/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: User = null;
  private subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.subscription = this.authService.onStateChange().subscribe(
      (user) => { this.user = user;
      });
  }

  logIn() {
  }

  logout() {
    this.authService.logOut().then(() => this.router.navigate(["/auth/login"]));
  }

  ngOnDestroy(): void {
    this.authService.logOut();
    this.subscription.unsubscribe();
  }

}
