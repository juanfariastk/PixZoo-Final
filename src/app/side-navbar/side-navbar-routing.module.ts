import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAdminContentComponent } from './main-admin-content/main-admin-content.component';
import { MainAdminControlComponent } from './main-admin-control/main-admin-control.component';
import { MainAdminPainelComponent } from './main-admin-painel/main-admin-painel.component';
import { MainContentUserComponent } from './main-content-user/main-content-user.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';

const navbarRoutes: Routes = [
  {
    path: 'dashboard',
    component: MainNavbarComponent,
    children: [
      { path: '', redirectTo: 'bets', pathMatch: 'full' },
      { path: 'bets', component: MainContentComponent },
      { path: 'user', component: MainContentUserComponent }
    ],
  },
  {
    path: 'admin',
    component: MainAdminContentComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' }, 
      { path: 'all', component: MainAdminControlComponent },
      { path: 'painel', component: MainAdminPainelComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(navbarRoutes)],
  exports: [RouterModule],
})
export class SideNavbarRoutingModule {}