import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class UserService {

  private collection: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.collection = this.db.collection("users");
  }

  getUser(id: string): Promise<any> {
    return this.collection.doc(id).ref.get();
  }
}
