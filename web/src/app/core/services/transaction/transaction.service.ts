import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {Transaction} from '../../models/transaction/transaction';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {User} from '../../models/user/user';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private collection: AngularFirestoreCollection;

  constructor(private db: AngularFirestore, private auth: AuthService) {
    this.collection = this.db.collection('users');

  }

  getSubscription(): Observable<any> {
    const uid = this.auth.getUser().id;
    return this.collection
      .doc<User>(uid)
      .collection<Transaction>('transactions')
      .stateChanges(['added', 'removed']);
  }

  add(transaction: Transaction): Promise<DocumentReference> {
    const uid = this.auth.getUser().id;
    return this.collection
      .doc(uid)
      .collection('transactions')
      .add({...transaction});
  }

  delete(id: string): Promise<void> {
    const uid = this.auth.getUser().id;
    return this.collection
      .doc(uid)
      .collection('transactions')
      .doc(id)
      .delete();
  }
}
