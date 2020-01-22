import {AngularFireAuth} from '@angular/fire/auth';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {auth, User} from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private state: Observable<User>;
  private isLogged: boolean;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState.subscribe(user => {
      this.isLogged = user != null;
    });
  }

  logIn(email: string, password: string): Promise<auth.UserCredential> {
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password);
  }

  getAuthState(): Observable<User> {
    return this.firebaseAuth.authState;
  }

  getUser(): User | null {
    return this.firebaseAuth.auth.currentUser;
  }

  isLoggedIn() {
    return this.isLogged;
  }

  logOut(): Promise<void> {
    return this.firebaseAuth.auth.signOut();
  }
}
