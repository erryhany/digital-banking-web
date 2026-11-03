import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers!: Observable<Array<Customer>>;
  errorMessage! : String;
  searchFormGroup!: FormGroup | undefined;
  constructor(private customerService: CustomerService, private fb: FormBuilder,private router : Router) {
  }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
    keyword : this.fb.control("")
  });
    this.handelSearchCustomer();
  }

  handelSearchCustomer() {
    let kw=this.searchFormGroup?.value.keyword;
    this.customers=this.customerService.searchCustomer(kw).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteCustumer(c:Customer) {
    let conf=confirm("Are you sure you want to delete this customer?");
    if (!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next:value => {
        this.customers=this.customers.pipe(
          map(data=>{
            return data.filter(customer=>customer.id!==c.id);
          })
        );
      },
      error: err => {
        console.log(err);
      }
    });
  }

  handleCustumerAccounts(c: Customer) {
  this.router.navigateByUrl("/admin/customer-accounts/"+c.id,{state:c});

  }
}
