import {Component, OnInit} from '@angular/core';
import {Transaction} from '../../core/models/transaction/transaction';
import {AngularFirestoreCollection} from '@angular/fire/firestore/collection/collection';
import {TransactionService} from '../../core/services/transaction/transaction.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [TransactionService]
})

export class AddComponent implements OnInit {

  model2: any = {
    amount: '',
    description: '',
    date: '',
    type: '',
    category: ''
  };

  model: Transaction = new Transaction();

  categories: string[] = ['esto', 'es', 'una', 'prueba'];


  constructor(private transactionService: TransactionService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.transactionService.addTransaction(this.model);
    console.log(this.model);
  }

  changed() {
    console.log(this.model.type);
  }

}
