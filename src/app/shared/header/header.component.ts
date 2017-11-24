import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/rest/user/user.service';
import { User, LoginCallback } from '../../services/rest/models';
import { StorageService } from '../../services/storage/storage.service';
import { FollowService } from '../../services/rest/follow/follow.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'tl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()hamburgerClicked = new EventEmitter();

  spSearchOpened = false;
  isUserTyping = false;
  initialized = false;

  foundUsers: User[] = [];
  userFollowing: boolean[] = [];

  myData: LoginCallback;

  searchQuery = '';

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private followService: FollowService) { }

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
    if (text.length === 0) {
      this.foundUsers = [];
    }
    this.userService.searchUser(text)
      .subscribe(users => {
        this.foundUsers = users;

        users.map((user, idx) => {
          this.followService.checkFollowup(user.screen_name).subscribe((flag: boolean) => {
            this.userFollowing[idx] = flag;
          });
        });
      }, err => {
        console.error(err);
      });
  }

  isFollow(screenName: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.followService.checkFollowup(screenName).subscribe((flag: boolean) => {
        observer.next(flag);
      });
    });
  }

  navigateProfile(screenName: string) {
    
  }

}
