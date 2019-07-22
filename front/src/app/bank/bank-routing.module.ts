import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './user/user.component';
import {EntityComponent} from './entity/entity.component';
import {BranchComponent} from './branch/branch.component';
import {RoleComponent} from './role/role.component';
import {BankEntitiesComponent} from './bank-entities/bank-entities.component';
import {EntityFormComponent} from './entity/entity-form/entity-form.component';
import {BranchFormComponent} from './branch/branch-form/branch-form.component';
import {MessageEntitiesComponent} from './message-entities/message-entities.component';
import {TemplateComponent} from './templates/templates.component';
import {MessageComponent} from './messages/messages.component';


const routes: Routes = [
    {
        path: 'admin/home',
        component: DashboardComponent
    },
    {
        path: 'admin/users',
        component: UserComponent,
    },
    {
        path: 'admin/entities',
        component: EntityComponent,
    },
    {
        path: 'admin/entities/form',
        component: EntityFormComponent,
    },
    {
        path: 'admin/entities/form/:entityId',
        component: EntityFormComponent,
    },
    {
        path: 'admin/branches',
        component: BranchComponent,
    },
    {
        path: 'admin/branches/form',
        component: BranchFormComponent,
    },
    {
        path: 'admin/branches/form/:branchId',
        component: BranchFormComponent,
    },
    {
        path: 'admin/roles',
        component: RoleComponent,
    },
    {
        path: 'admin/bank-entities',
        component: BankEntitiesComponent,
    },
    {
        path: 'admin/message-entities',
        component: MessageEntitiesComponent,
    },
    {
        path: 'admin/templates',
        component: TemplateComponent
    },
    {
        path: 'admin/messages',
        component: MessageComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BankRoutingModule {
}
