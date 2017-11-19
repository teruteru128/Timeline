import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../services/rest/models';
import { FollowService } from '../../services/rest/follow/follow.service';
import { StorageService } from '../../services/storage/storage.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'tl-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent implements OnInit {

  @Input() data: Post;

  followState = 'Follow';

  own = false;

  constructor(
    private storageService: StorageService,
    private followService: FollowService) { }

  ngOnInit() {
    this.own = this.isOwnPost();
    this.getFollowState().subscribe(state => this.followState = state);
  }

  isOwnPost(): boolean {
    const id = this.storageService.fetch('user')['userId'];
    if (this.data.userId === id) {
      return true;
    }
    return false;
  }

  checkFollow(): Observable<boolean> {
    return new Observable<boolean>(obs => {
      this.followService.checkFollowing(this.data.user.userId)
        .subscribe(resp => {
          obs.next(resp);
        }, err => {
          obs.error(err);
        });
    });
  }

  getFollowState(): Observable<string> {
    return new Observable<string>(obs => {
      this.checkFollow().subscribe(isFollow => {
        if (isFollow) {
          obs.next('Remove');
          return;
        }
        obs.next('Follow');
      });
    });
  }
}
