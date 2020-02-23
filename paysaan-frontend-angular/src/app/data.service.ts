import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from './../environments/environment';
import { User } from './_model/user';
import { Transaction } from './_model/transaction';
const httpOptions = {
  headers: new HttpHeaders({ "Authorization": "Basic " + btoa("ACe7b9c398bf2a89955bff52947741c8f8:aceb6c6e64acfc6e6230fb5fff823434") })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public otpFormData = new FormData();
  public transactionFormData = new FormData();
  public signatureFormData = new FormData();

  constructor(private http: HttpClient) {
  }
  newWallet() {
    return this.http.get<any>(`${environment.pythonClient}/wallet/new`);
  }
  saveUser(user) {
    return this.http.post<any>(`${environment.spring}/adduser`, user);
  }
  getUser(mobileNumber) {
    return this.http.get<any>(`${environment.spring}/get/${mobileNumber}`);
  }
  checkBalance(publicKey) {
    return this.http.get<any>(`${environment.python}/get/${publicKey}`);
  }
  getSignature(transaction) {
    this.signatureFormData.append('sender_address',transaction.sender_address);
    this.signatureFormData.append('recipient_address',transaction.recipient_address);
    this.signatureFormData.append('sender_private_key',transaction.sender_private_key);
    this.signatureFormData.append('amount',transaction.amount);
    this.signatureFormData.append('description',transaction.description);

    return this.http.post<any>(`${environment.pythonClient}/generate/transaction`, this.signatureFormData);
  }
  createTransaction(transaction) {
    this.transactionFormData.append('sender_address',transaction.sender_address);
    this.transactionFormData.append('recipient_address',transaction.recipient_address);
    this.transactionFormData.append('signature',transaction.signature);
    this.transactionFormData.append('amount',transaction.amount);
    this.transactionFormData.append('description',transaction.description);
    return this.http.post<any>(`${environment.python}/transactions/new`, this.transactionFormData);
  }
  mine() {
    return this.http.get<any>(`${environment.python}/mine`);
  }
  sendOtp(otp, mobileNumber) {
    this.otpFormData.append('Body', otp);
    this.otpFormData.append('To' , mobileNumber);
    this.otpFormData.append('From', '+12055760727');
    return this.http.post(`https://api.twilio.com/2010-04-01/Accounts/ACe7b9c398bf2a89955bff52947741c8f8/Messages.json`,this.otpFormData, httpOptions);
  }
  getTransactions() {
    return this.http.get<any>(`${environment.python}/chain`);
  }

}
