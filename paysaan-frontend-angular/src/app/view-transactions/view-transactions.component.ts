import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css'],
  
})
export class ViewTransactionsComponent implements OnInit {
  public transaction:any;
  public chain:any;
  public block:any;
  public sn=0;
  constructor(
    private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getTransactions().subscribe(
      data => {
        this.transaction = data;
      }
    );
  }
  counter() {
    this.sn++;
    return this.sn;
  }

}
