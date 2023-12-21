import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserBet } from 'src/app/shared/types/userBet.type';
import { UserData } from 'src/app/shared/types/userData.type';
import { UserLogged } from 'src/app/shared/types/userLogged.type';
import { AdminService } from '../admin-services/admin-service.service';

@Component({
  selector: 'app-main-admin-painel',
  templateUrl: './main-admin-painel.component.html',
  styleUrls: ['./main-admin-painel.component.scss']
})
export class MainAdminPainelComponent implements OnInit {
  displayedColumns: string[] = ['userId', 'userEmail', 'openedAt', 'userType'];
  displayedColumnsUserData: string[] = ['name', 'email', 'birthday', 'amountDeposited'];
  displayedColumnsUserBets: string[] = ['userId', 'userCPF','userEmail', 'animalsSelected', 'amountBet', 'date'];


  dataSourceSessions: MatTableDataSource<UserLogged> = new MatTableDataSource();
  dataSourceUserData: MatTableDataSource<UserData> = new MatTableDataSource();
  dataSourceUserBets: MatTableDataSource<UserBet> = new MatTableDataSource(); 

  @ViewChild('paginator') paginator: MatPaginator | undefined;
  @ViewChild('paginatorUserData') paginatorUserData: MatPaginator | undefined;
  @ViewChild('paginatorUserBets') paginatorUserBets: MatPaginator | undefined;


  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getLoginData().subscribe((data: UserLogged[]) => {
      this.dataSourceSessions.data = data;
      
      if (this.paginator) {
        this.dataSourceSessions.paginator = this.paginator;
        console.log(this.dataSourceSessions.data.length)
      }
    });

    this.adminService.getAllUsersData().subscribe((data:UserData[])=>{
      this.dataSourceUserData = new MatTableDataSource(data);
      
      if(this.paginatorUserData){
        this.dataSourceUserData.paginator = this.paginatorUserData;
      }
    });

    this.adminService.getAllUserBets().subscribe((data: UserBet[]) => {
      this.dataSourceUserBets.data = data;

      if (this.paginatorUserBets) {
        this.dataSourceUserBets.paginator = this.paginatorUserBets;
      }
    });
  }
}

