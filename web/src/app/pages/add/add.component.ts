import {Component, OnInit, ViewChild} from '@angular/core';
import {Transaction} from '../../core/models/transaction/transaction';
import {TransactionService} from '../../core/services/transaction/transaction.service';
import {NbWindowRef} from '@nebular/theme';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [TransactionService]
})

export class AddComponent implements OnInit {

  @ViewChild('addForm') addForm;
  model: Transaction = new Transaction();
  categories = [];
  private EXPENSE = ['food', 'personal', 'fun', 'trip', 'health', 'vehicle', 'clothes', 'transport', 'other'];
  private INCOME = ['salary', 'investments', 'sales', 'other'];

  constructor(private transactionService: TransactionService, public windowRef: NbWindowRef) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.model.type === 'expense') {
      this.model.amount = -this.model.amount;
    }

    this.transactionService.add(this.model)
      .then(res => {
        // this.addForm.form.reset();
        this.close();
      });
  }

  typeChanged() {
    if (this.model.type === 'expense') {
      this.categories = this.EXPENSE;
    } else {
      this.categories = this.INCOME;
    }
  }

  close() {
    this.windowRef.close();
  }
}
