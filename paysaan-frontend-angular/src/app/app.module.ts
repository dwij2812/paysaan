import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatSelectModule,
  MatCheckboxModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MAT_DATE_LOCALE,
  MatRadioModule,
  MAT_RADIO_DEFAULT_OPTIONS,
  MatExpansionModule, MatDialogModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { OtpDialogComponent } from './otp-dialog/otp-dialog.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    MakePaymentComponent,
    OtpDialogComponent,
    ViewTransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule, MatSelectModule, MatCheckboxModule, MatInputModule, MatCardModule, MatIconModule,
    FormsModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatSortModule,
    HttpClientModule, CommonModule, MatRadioModule,
    MatExpansionModule, MatDialogModule
  ],
  providers: [    {provide: LocationStrategy, useClass: HashLocationStrategy}  ],
  bootstrap: [AppComponent],
  entryComponents: [OtpDialogComponent]
})
export class AppModule { }
