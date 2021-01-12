import {Component, OnInit, ViewChild} from "@angular/core";
import {Transaction} from "../../core/models/transaction/transaction";
import {TransactionService} from "../../core/services/transaction/transaction.service";
import {NbWindowRef} from "@nebular/theme";
import {Categories} from "../../core/constants/constants";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
  providers: [TransactionService]
})

export class AddComponent implements OnInit {

  @ViewChild("addForm") addForm;
  model: Transaction = new Transaction();
  categories: any;

  constructor(private transactionService: TransactionService, public windowRef: NbWindowRef) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.model.type === "expense") {
      this.model.amount = -this.model.amount;
    }

    this.splitDate();

    this.transactionService.add(this.model)
      .then(() => {
        // this.addForm.form.reset();
        this.close();
      });
  }

  typeChanged() {
    if (this.model.type === "expense") {
      this.categories = Categories.EXPENSE;
    } else {
      this.categories = Categories.INCOME;
    }
  }

  close() {
    this.windowRef.close();
  }

  private splitDate() {
    const parts = this.model.date.split("-");
    this.model.year = parseInt(parts[0], 10);
    this.model.month = parseInt(parts[1], 10);
    this.model.day = parseInt(parts[2], 10);
  }
}
