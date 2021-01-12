import {Injectable} from '@angular/core';
import {User} from '../../models/user/user';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private user: User = null;
  private state: Subject<User> = new Subject<User>();

  constructor() {
  }

  newSession(user: User) {
    this.user = user;
    this.state.next(this.user);
  }

  endSession() {
    this.user = null;
    this.state.next(this.user);
  }

  getState(): Observable<User> {
    return this.state.asObservable();
  }
}
