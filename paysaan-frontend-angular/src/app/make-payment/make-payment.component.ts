import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { OtpDialogComponent } from '../otp-dialog/otp-dialog.component';
import { DataService } from '../data.service';
import { EncryptDecryptService } from '../encrypt-decrypt.service';
import {User} from '../_model/user';
import { Transaction} from '../_model/transaction';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {

  public payment: FormGroup;
  public error: string;
  public sender: User;
  public receiver: User;
  public transaction: Transaction;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public dialog: MatDialog,
              private dataService: DataService,
              private encryptDecryptService: EncryptDecryptService
              ) {
    this.payment = this.formBuilder.group(
      {
        senderMobileNumber: new FormControl('', [Validators.required]),
        receiverMobileNumber: new FormControl('', [Validators.required]),
        value: new FormControl(0, [Validators.required, Validators.min(1)]),
        password: new FormControl('', Validators.required),
        description: new FormControl('Payments', Validators.required)
      }
    );
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.payment.valid) {
      return;
    }
    this.getSender();
  }
  getRecipient() {
    this.dataService.getUser(this.payment.controls.receiverMobileNumber.value).subscribe(
      data => {
        if (data) {
          this.receiver = data;
          this.checkBalance();
        } else {
          return;
        }
      }
    );
  }
  getSender(){
    this.dataService.getUser(this.payment.controls.senderMobileNumber.value).subscribe(
      data => {
        if (data) {
          this.sender = data;
          this.getRecipient();
        } else {
          return;
        }
      }
    );
  }
  checkBalance()
  {
    this.dataService.checkBalance(this.sender.publicKey).subscribe(
      data => {
        const balance = data.balance;
        //if (balance >= this.payment.controls.value.value) {
          if (true) {
          this.transaction = {
            recipient_address: this.receiver.publicKey,
          sender_address: this.sender.publicKey,
          sender_private_key: this.encryptDecryptService.decryptPasswordWithAES(this.sender.privateKey),
          amount: this.payment.controls.value.value,
          description: this.payment.controls.description.value
          }
          this.dataService.getSignature(this.transaction).subscribe(data => {
            if(data) {
              this.transaction.signature = data.signature;
              this.transaction.sender_private_key = null;
              this.dataService.createTransaction(this.transaction).subscribe(data => {
                this.dataService.mine().subscribe(data => {});
              })
            }
          });
          this.router.navigate(['/']).then(r => {});
        } else {
          this.error = 'Insufficient Funds';
          return;
        }
      }
    );
  }
}
