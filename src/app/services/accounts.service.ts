import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountDetails} from "../model/account.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  backendHost:string="http://localhost:8085";
  constructor(private http : HttpClient) { }


  public getAccount(accountId: string,page:number,size:number):Observable<AccountDetails>{
    console.log('Fetching account:', accountId, 'page:', page, 'size:', size);
    const url = this.backendHost+"/accounts/"+accountId+"/PageOperations?page="+page+"&size="+size;
    console.log('URL:', url);
    return this.http.get<AccountDetails>(url);
  }

  public debit(accountId: string,amount:number,description:string){
   let data={accountId:accountId,amount: amount,description:description};
    return this.http.post(this.backendHost+"/accounts/debit",data);
  }
  public credit(accountId: string,amount:number,description:string){
    let data={accountId:accountId,amount: amount,description:description};
    return this.http.post(this.backendHost+"/accounts/credit",data);
  }
  public transfer(accountSource: string,accountDestination:string,amount:number,description:string){
    let data={accountSource,accountDestination,amount,description};
    return this.http.post(this.backendHost+"/accounts/transfer",data);
  }
}
