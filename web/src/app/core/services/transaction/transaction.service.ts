import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {Transaction} from '../../models/transaction/transaction';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {User} from '../../models/user/user';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private collection;
  private uid: string;
  private subscription;

  constructor(private db: AngularFirestore, private auth: AuthService) {
    // this.collection = db.collection<Transaction>('transaction', ref => ref.orderBy('date'));

  }

  getSubscription(): Observable<any> {
    const uid = this.auth.getUser().id;
    const coll = this.db.collection<User>('users')
      .doc<User>(uid)
      .collection<Transaction>('transactions', ref => ref.orderBy('date'));
    return coll.snapshotChanges();
  }

  add(transaction: Transaction): Promise<DocumentReference> {
    const uid = this.auth.getUser().id;
    const coll = this.db.collection('users')
      .doc(uid)
      .collection('transactions');
    return coll.add({...transaction});
  }

  delete(id: string): Promise<void> {
    const uid = this.auth.getUser().id;
    return this.db.collection('users')
      .doc(uid)
      .collection('transactions')
      .doc(id)
      .delete();
  }
}
