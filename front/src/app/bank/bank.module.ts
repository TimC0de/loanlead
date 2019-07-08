import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BankRoutingModule} from './bank-routing.module';
import { UserComponent } from './user/user.component';
import { BranchComponent } from './branch/branch.component';
import { EntityComponent } from './entity/entity.component';
import { RoleComponent } from './role/role.component';


@NgModule({
    declarations: [UserComponent, BranchComponent, EntityComponent, RoleComponent],
    imports: [
        CommonModule,
        BankRoutingModule
    ],
    exports: [
        BankRoutingModule
    ]
})
export class BankModule {
}
