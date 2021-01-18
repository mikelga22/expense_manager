import {AngularFireAuth} from "@angular/fire/auth";
import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {User} from "../../models/user/user";
import {UserService} from "../user/user.service";


@Injectable({
  providedIn: "root"
})
export class AuthService {

  private isLogged = false;
  private state: Subject<User | null> = new Subject<User | null>();

  constructor(private firebaseAuth: AngularFireAuth, private userService: UserService) {
    this.firebaseAuth.authState.subscribe(async (fireUser) => {
      if (fireUser === null) {
        this.isLogged = false;
        this.state.next(null);
      } else {
        this.isLogged = true;
        const id = fireUser.uid;
        const user: User = new User();
        const data = (await this.userService.getUser(id)).data();
        user.id = id;
        user.name = data.name;
        user.email = data.email;
        this.state.next(user);
      }
    });
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      await this.firebaseAuth.signInWithEmailAndPassword(email, password);
      this.isLogged = true;
      return true;
    } catch (e) {
      return false;
    }
  }

  async logOut(): Promise<boolean> {
    try {
      await this.firebaseAuth.signOut();
      return true;
    } catch (e) {
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }

  onStateChange(): Observable<User | null> {
    return this.state;
  }
}
