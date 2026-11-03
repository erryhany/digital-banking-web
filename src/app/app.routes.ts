import {RouterModule, Routes} from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NgModule} from "@angular/core";
import {NewCustumerComponent} from "./new-custumer/new-custumer.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";

export const appRoutes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "",redirectTo:"/login", pathMatch: "full"},
  {path:"admin",component:AdminTemplateComponent,children:[
      {path : "customers",component: CustomersComponent},
      {path :"accounts",component: AccountsComponent},
      {path :"new-customer",component: NewCustumerComponent},
      {path:"customer-accounts/:id",component: CustomerAccountsComponent},
    ]}

];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
