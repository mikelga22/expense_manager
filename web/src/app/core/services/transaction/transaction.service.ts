import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from "@angular/fire/firestore";
import {Transaction} from "../../models/transaction/transaction";
import {Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {User} from "../../models/user/user";


@Injectable({
  providedIn: "root"
})
export class TransactionService {

  private collection: AngularFirestoreCollection;
  private id: string;

  constructor(private db: AngularFirestore, private auth: AuthService) {
    this.auth.onStateChange().subscribe((user) => {
      if (user) {
        this.id = user.id;
      } else {
        this.id = null;
      }
    });

    this.collection = this.db.collection("users");
  }

  getSubscription(): Observable<any> {
    return this.collection
      .doc<User>(this.id)
      .collection<Transaction>("transactions")
      .stateChanges(["added", "removed"]);
  }

  add(transaction: Transaction): Promise<DocumentReference> {
    return this.collection
      .doc(this.id)
      .collection("transactions")
      .add({...transaction});
  }

  delete(id: string): Promise<void> {
    return this.collection
      .doc(this.id)
      .collection("transactions")
      .doc(id)
      .delete();
  }
}
