import { Transaction } from "../../../../src/app/core/models/transaction/transaction";

describe("Transaction.Model", () => {
  it("should create an instance", () => {
    expect(new Transaction()).toBeTruthy();
  });
});
