import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/rest/user/user.service';
import { User, LoginCallback } from '../../services/rest/models';
import { StorageService } from '../../services/storage/storage.service';
import { FollowService } from '../../services/rest/follow/follow.service';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'tl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()hamburgerClicked = new EventEmitter();

  isUserTyping = false;
  initialized = false;

  foundUsers: User[] = [];
  userFollowing: boolean[] = [];

  myData: LoginCallback;

  searchQuery = '';

  spSearching = false;

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private followService: FollowService,
    private router: Router
    ) { }

  ngOnInit() {
    this.myData = this.storageService.fetch('user');
    this.initialized = true;
  }

  clicked() {
    this.hamburgerClicked.emit();
  }

  onSearchFocused() {
    this.isUserTyping = true;
  }

  onSearchBlured() {
    this.isUserTyping = false;
  }

  onQueryChange(text: string) {
    if (this.searchQuery.length === 0) {
      this.foundUsers = [];
      return;
    }
    this.userService.searchUser(text)
      .subscribe((users: User[]) => {
        this.foundUsers = users;

        users.map((user, idx) => {
          this.followService.checkFollowers(user.name).subscribe((flag: boolean) => {
            this.userFollowing[idx] = flag;
          });
        });
      }, err => {
        console.error(err);
      });
  }

  navigateProfile(screenName: string) {
    this.isUserTyping = false;
    this.spSearching = false;
    this.searchQuery = '';
    this.foundUsers = [];

    this.router.navigate(['/profile/' + screenName]);

  }

}
