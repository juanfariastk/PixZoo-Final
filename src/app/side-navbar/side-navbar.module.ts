import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';


import { RouterModule } from '@angular/router';

import { DrawDialogComponent } from './draw-dialog/draw-dialog.component';
import { MainAdminContentComponent } from './main-admin-content/main-admin-content.component';
import { MainAdminControlComponent } from './main-admin-control/main-admin-control.component';
import { MainAdminPainelComponent } from './main-admin-painel/main-admin-painel.component';
import { MainContentUserComponent } from './main-content-user/main-content-user.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { SideNavbarRoutingModule } from './side-navbar-routing.module';

@NgModule({
  declarations: [
    MainContentComponent,
    MainNavbarComponent,
    MainContentUserComponent,
    MainAdminContentComponent,
    MainAdminControlComponent,
    MainAdminPainelComponent,
    DrawDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SideNavbarRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule, 
    MatSnackBarModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class SideNavbarModule {}
