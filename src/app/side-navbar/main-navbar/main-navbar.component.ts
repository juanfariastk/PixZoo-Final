import { Component } from '@angular/core';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent{
  constructor(private userService: UserService) {}

  logoff(): void {
    setTimeout(() => {
      this.userService.logoffUser();
    }, 2300);
  }
}
