import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'payments', component: MakePaymentComponent },
  {path: 'view', component: ViewTransactionsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
