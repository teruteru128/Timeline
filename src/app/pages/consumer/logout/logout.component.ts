import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/rest/user/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'tl-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private userService: UserService,
    private _location: Location
  ) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

  back() {
    this._location.back();
  }

}
