import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../../core/services/transaction/transaction.service';
import {Transaction} from '../../core/models/transaction/transaction';
import {User} from '../../core/models/user/user';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [TransactionService]
})
export class HistoryComponent implements OnInit {

  transactions: Transaction[];

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit() {
    const subscription = this.transactionService.getTransactions().subscribe(
      (snapshot) => {
        this.transactions = [];
        snapshot.forEach((item: any) => {
          this.transactions.push(item.payload.doc.data());
        });
        console.log(this.transactions);
      },
      error => {
        console.log('no tienes permisos');
        console.log(error);
      },
      () => console.log('complete')
    );
  }
}
