import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../../core/services/transaction/transaction.service';
import {Transaction} from '../../core/models/transaction/transaction';
import {NbWindowService} from '@nebular/theme';
import {AddComponent} from '../add/add.component';

@Component({
  selector: 'app-history',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [TransactionService, NbWindowService]
})
export class DashboardComponent implements OnInit {

  transactions: Transaction[];
  totalIncome: number;
  totalExpense: number;
  balance: number;

  constructor(private transactionService: TransactionService, private windowService: NbWindowService) {
  }

  ngOnInit() {
    const subscription = this.transactionService.getSubscription().subscribe(
      (snapshot) => {
        this.transactions = [];
        this.resetBalance();
        snapshot.forEach((item: any) => {
          const transaction: any = {};
          transaction.id = item.payload.doc.id;
          Object.assign(transaction, item.payload.doc.data());
          this.updateBalance(transaction.type, transaction.amount);
          this.transactions.push(transaction);
        });
      },
      error => {
        console.log('No permissions');
        console.log(error);
      },
      () => console.log('complete')
    );
  }

  openAdd() {
    this.windowService.open(AddComponent, {title: `Add`});
  }

  delete(id: string) {
    this.transactionService.delete(id).then(() => {
      console.log('successfully deleted');
    })
      .catch(reason => {
        console.log('error: ' + reason);
      });
  }

  updateBalance(type: string, amount: number) {
    switch (type) {
      case 'expense':
        this.totalExpense += amount;
        break;

      case 'income':
        this.totalIncome += amount;
    }

    this.balance += amount;
  }

  resetBalance() {
    this.totalExpense = 0;
    this.totalIncome = 0;
    this.balance = 0;
  }
}
