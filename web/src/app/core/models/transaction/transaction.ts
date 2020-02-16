import {firestore} from 'firebase';

export class Transaction {
  id: string;
  type: string;
  category: string;
  description: string;
  amount: number;
  date: firestore.Timestamp;
  day: number;
  month: number;
  year: number;

  constructor() {
  }
}
