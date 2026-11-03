import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-custumer',
  templateUrl: './new-custumer.component.html',
  styleUrls: ['./new-custumer.component.css']
})
export class NewCustumerComponent implements OnInit {
newCutomerFormGroup! : FormGroup;

  constructor(private fb: FormBuilder ,private customerServie : CustomerService, private router : Router) { }

  ngOnInit(): void {
    this.newCutomerFormGroup = this.fb.group({
      name:this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      email:this.fb.control(null,[Validators.required,Validators.email]),
    });
  }

  handleSaveCustomer() {
    let customer:Customer = this.newCutomerFormGroup.value;
    this.customerServie.saveCustomer(customer).subscribe({
      next : data=>{
        alert("Customer saved successfully!");
        //this.newCutomerFormGroup.reset();
        this.router.navigate(['/customers']);
      },
      error : err=>{
        console.log(err);
      }
    });
  }
}
