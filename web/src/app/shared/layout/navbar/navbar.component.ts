import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SessionService} from '../../../core/services/session/session.service';
import {User} from '../../../core/models/user/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: User = null;
  private subscription: Subscription;

  constructor(private sessionService: SessionService) {

  }

  ngOnInit() {
    this.subscription = this.sessionService.getState().subscribe(
      (user) => {
        this.user = user;
      });
  }

  logIn() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
