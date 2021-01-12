import {AngularFireAuth} from "@angular/fire/auth";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../../models/user/user";
import {UserService} from "../user/user.service";
import {SessionService} from "../session/session.service";


@Injectable({
  providedIn: "root"
})
export class AuthService {

  private state: Observable<User>;
  private isLogged = false;

  // temporal fix
  private user: User = null;

  constructor(private firebaseAuth: AngularFireAuth, private userService: UserService, private sessionService: SessionService) {
  }

  async login(email: string, password: string) {
    try {
      const resp = await this.firebaseAuth.signInWithEmailAndPassword(email, password);
      const user: User = new User();
      let data = await this.userService.getUser(resp.user.uid);
      data = data.data();
      user.name = data.name;
      user.email = data.email;
      user.id = resp.user.uid;
      this.user = user;
      this.isLogged = true;
      this.sessionService.newSession(user);
      return true;
    } catch (e) {
      return false;
    }
  }

  getUser(): User | null {
    return this.user;
  }

  isLoggedIn() {
    return this.isLogged;
  }

  async logOut() {
    try {
      await this.firebaseAuth.signOut();
      this.sessionService.endSession();
      this.isLogged = false;
      this.user = null;
      return true;
    } catch (e) {
      return false;
    }
  }
}
