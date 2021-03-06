import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/rest/user/user.service';
import { StorageService } from '../../services/storage/storage.service';
import { LoginCallback, User } from '../../services/rest/models';
import { Router } from '@angular/router';

@Component({
  selector: 'tl-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  user: User;
  path: string;

  @Output()onMenuClick = new EventEmitter();

  initialized = false;

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProfile();
    this.path = this.router.url;
  }

  getProfile() {
    const storage = this.storageService.fetch('user') as LoginCallback;
    const userId = storage.screen_name;
    this.userService.getUserByScreenName(userId).subscribe(user => {
      this.user = user;
      this.initialized = true;
    });
  }

  onMenuClicked() {
    this.onMenuClick.emit();
  }


  openProfile() {
    this.router.navigate(['/profile/' + this.user.screen_name]);
  }
}
