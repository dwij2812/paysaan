export class Transaction {
  // tslint:disable-next-line:variable-name
  sender_address: string;
  // tslint:disable-next-line:variable-name
  recipient_address: string;
  // tslint:disable-next-line:variable-name
  sender_private_key?: string;
  signature?: string;

  amount: string;
  description: string;
}
