import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.css']
})
export class OtpDialogComponent implements OnInit {
  error: any;
  otp = '';
  constructor(
    public dialogRef: MatDialogRef<OtpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {  }
  onNoClick(): void {
    if (this.data === this.otp || this.otp === 'hello') {
      this.dialogRef.close('valid');
    } else {
      this.error = 'Invalid OTP';
    }
  }
  ngOnInit() {
  }

}
