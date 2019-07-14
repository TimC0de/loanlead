import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BankRoutingModule} from './bank-routing.module';
import { UserComponent } from './user/user.component';
import { BranchComponent } from './branch/branch.component';
import { EntityComponent } from './entity/entity.component';
import { RoleComponent } from './role/role.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [UserComponent, BranchComponent, EntityComponent, RoleComponent, DashboardComponent, UsersListComponent ],
    imports: [
        CommonModule,
        BankRoutingModule,
        ReactiveFormsModule
    ],
    exports: [
        BankRoutingModule
    ]
})
export class BankModule {
}
