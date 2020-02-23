import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { OtpDialogComponent } from '../otp-dialog/otp-dialog.component';
import { DataService } from '../data.service';
import { EncryptDecryptService } from '../encrypt-decrypt.service';
import {User} from '../_model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public register: FormGroup;
  public error: string;
  public otp: string;
  public user: User;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public dialog: MatDialog,
              private dataService: DataService,
              private encryptDecryptService: EncryptDecryptService
              ) {
    this.register = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        mobileNumber: new FormControl('', [Validators.required]),
        password: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required)
      }
    );
  }

  ngOnInit() {
  }

  openDialog(): void {
    if (!this.register.valid) {
      return;
    }
    this.otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.dataService.sendOtp(this.otp, this.register.controls.mobileNumber.value).subscribe( () => {});
    const dialogRef = this.dialog.open(OtpDialogComponent, {
      data: this.otp,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'valid') {
        this.dataService.newWallet().subscribe(
          data => {
            this.user = {
            name: this.register.controls.name.value,
            address: this.register.controls.address.value,
            password: this.register.controls.password.value,
            phoneNo: this.register.controls.mobileNumber.value,
            publicKey: data.public_key,
            privateKey: this.encryptDecryptService.encryptPasswordWithAES(data.private_key)
            }
            this.saveUser();
            this.router.navigate(['/']).then(r => {});
          }
        );
      } else {
        this.error = 'Registration Failed';
      }
    }
      );
  }
  saveUser()
  {
    this.dataService.saveUser(this.user).subscribe(data => {
    });

  }
}
