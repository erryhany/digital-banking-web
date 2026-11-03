import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {AccountDetails} from "../model/account.model";
import {catchError, Observable, throwError} from "rxjs";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
accountFormGroup: FormGroup;
currentPage : number=0;
pageSize:number=5;
accountObservable! : Observable<AccountDetails>;
operationFromGroup! : FormGroup;
errorMessage : String;
  constructor(private fb: FormBuilder,private accountService : AccountsService) { }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId : this.fb.control('')
    });
    this.operationFromGroup = this.fb.group({
      operationType : this.fb.control(null),
      amount : this.fb.control(0),
      description : this.fb.control(null),
      accountDestination : this.fb.control(null),
    })
  }

  handleSearchAccount() {
    let accountId : string = this.accountFormGroup.value.accountId;

    this.accountObservable=this.accountService.getAccount(accountId,this.currentPage,this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );

    // Log pour voir les données reçues
    this.accountObservable.subscribe({
      next: (accountDetails) => {
        console.log('=== ACCOUNT DETAILS RECEIVED ===');
        console.log('Account ID:', accountDetails.accountId);
        console.log('Balance:', accountDetails.balance);
        console.log('Total Pages:', accountDetails.totalPages);
        console.log('Operations:', accountDetails.accountOperationDTOS);
        console.log('===============================');
      },
      error: (error) => {
        console.error('Error fetching account:', error);
      }
    });
  }

  gotoPage(page: number) {
    this.currentPage=page;
    this.handleSearchAccount();

  }

  handleAccountOperation() {
    let accountId: string = this.accountFormGroup.value.accountId;
    let operationType: string = this.operationFromGroup.value.operationType;
    let amount: number = this.operationFromGroup.value.amount;
    let description: string = this.operationFromGroup.value.description;
    let accountDestination: string = this.operationFromGroup.value.accountDestination;
    if (operationType == 'DEBIT') {
      this.accountService.debit(accountId, amount, description).subscribe({
        next: (data) => {
          alert("Successfully debit");
          this.operationFromGroup.reset();
          this.handleSearchAccount();
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else if (operationType == 'CREDIT') {
      this.accountService.credit(accountId, amount, description).subscribe({
        next: (data) => {
          alert("Successfully credit");
          this.operationFromGroup.reset();
          this.handleSearchAccount();
        },
        error: (err) => {
          console.log(err);
        }
      });

    } else if (operationType == 'TRANSFER') {
      this.accountService.transfer(accountId,accountDestination, amount, description).subscribe({
        next: (data) => {
          alert("Successfully transfer");
          this.operationFromGroup.reset();
          this.handleSearchAccount();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

  }
}
