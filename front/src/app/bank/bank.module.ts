import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BankRoutingModule} from './bank-routing.module';
import { UserComponent } from './user/user.component';
import { BranchComponent } from './branch/branch.component';
import { EntityComponent } from './entity/entity.component';
import { RoleComponent } from './role/role.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BankEntitiesComponent } from './bank-entities/bank-entities.component';
import { EntityFormComponent } from './entity/entity-form/entity-form.component';
import { BranchFormComponent } from './branch/branch-form/branch-form.component';
import {PaginationComponent} from '../common/pagination/pagination.component';
import { MessageEntitiesComponent } from './message-entities/message-entities.component';
import { TemplateComponent } from './templates/templates.component';
import { MessageComponent } from './messages/messages.component';


@NgModule({
    declarations: [
        UserComponent,
        BranchComponent,
        EntityComponent,
        RoleComponent,
        DashboardComponent,
        UsersListComponent,
        BankEntitiesComponent,
        EntityFormComponent,
        BranchFormComponent,
        PaginationComponent,
        MessageEntitiesComponent,
        TemplateComponent,
        MessageComponent,
    ],
    imports: [
        CommonModule,
        BankRoutingModule,
        ReactiveFormsModule,
    ],
    exports: [
        BankRoutingModule
    ]
})
export class BankModule {
}
