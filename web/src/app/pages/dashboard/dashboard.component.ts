import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransactionService} from '../../core/services/transaction/transaction.service';
import {Transaction} from '../../core/models/transaction/transaction';
import {NbWindowService} from '@nebular/theme';
import {AddComponent} from '../add/add.component';
import {Categories} from '../../core/constants/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [TransactionService, NbWindowService]
})
export class DashboardComponent implements OnInit, OnDestroy {

  pieDataset: any;

  dataSubscription: any;

  currentYear: number;
  balance: number;
  totalIncome: number;
  totalExpense: number;

  transactions: Transaction[];

  barDataset = [
    {month: 'January', amount: 0},
    {month: 'February', amount: 0},
    {month: 'March', amount: 0},
    {month: 'April', amount: 0},
    {month: 'May', amount: 0},
    {month: 'June', amount: 0},
    {month: 'July', amount: 0},
    {month: 'August', amount: 0},
    {month: 'September', amount: 0},
    {month: 'October', amount: 0},
    {month: 'November', amount: 0},
    {month: 'December', amount: 0}
  ];

  constructor(private transactionService: TransactionService, private windowService: NbWindowService) {
    this.currentYear = new Date().getFullYear();

    this.balance = 0;
    this.totalIncome = 0;
    this.totalExpense = 0;

    this.pieDataset = [];
    this.transactions = [];

    this.initPieDataset();
  }

  ngOnInit() {
    this.dataSubscription = this.transactionService.getSubscription().subscribe(
      (snapshot) => {
        snapshot.forEach((item: any) => {
          const transaction: Transaction = new Transaction();
          transaction.id = item.payload.doc.id;
          Object.assign(transaction, item.payload.doc.data());
          if (item.type === 'added') {
            this.transactions.push(transaction);
          } else if (item.type === 'removed') {
            transaction.amount = -transaction.amount;
          }

          this.updateBarDataset(transaction);
          this.updateBalance(transaction.type, transaction.amount);
          this.updatePieDataset(transaction.category, transaction.type, transaction.amount);
        });
        this.transactions.sort((a, b) => a.date.localeCompare(b.date));
      },
      error => {
        console.log('No permissions');
        console.log(error);
      },
      () => console.log('complete')
    );
  }

  openAdd() {
    this.windowService.open(AddComponent, {title: 'Add'});
  }

  delete(index: number) {
    const id = this.transactions[index].id;
    this.transactionService.delete(id).then(() => {
      this.transactions.splice(index, 1);
    })
      .catch(reason => {
        console.log('error: ', reason);
      });
  }

  updateBalance(type: string, amount: number) {
    if (type === 'expense') {
      this.totalExpense += amount;
    } else {
      this.totalIncome += amount;
    }

    this.balance += amount;
  }

  resetBalance() {
    this.totalExpense = 0;
    this.totalIncome = 0;
    this.balance = 0;
  }

  updatePieDataset(category: string, type: string, amount: number) {
    if (type === 'expense') {
      this.pieDataset[Categories.EXPENSE.indexOf(category)].value += -amount;
    }

    // Fix to fire OnChanges() at child component
    this.pieDataset = this.pieDataset.concat();
  }

  updateBarDataset(transaction: Transaction) {
    if (transaction.year === this.currentYear && transaction.type === 'expense') {
      this.barDataset[transaction.month - 1].amount += -transaction.amount;

      // Fix to fire OnChanges() at child component
      this.barDataset = this.barDataset.concat();
    }
  }

  initPieDataset(){
    Categories.EXPENSE.forEach(e => {
      this.pieDataset.push({
        name: e,
        value: 0
      });
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
