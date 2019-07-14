import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './user/user.component';
import {EntityComponent} from './entity/entity.component';
import {BranchComponent} from './branch/branch.component';
import {RoleComponent} from './role/role.component';


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
        path: 'admin/branches',
        component: BranchComponent,
    },
    {
        path: 'admin/roles',
        component: RoleComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BankRoutingModule {
}
