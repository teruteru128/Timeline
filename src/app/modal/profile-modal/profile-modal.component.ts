import { Component, OnInit, Input } from '@angular/core';
import { Post, User } from '../../services/rest/models';
import { FollowService } from '../../services/rest/follow/follow.service';
import { StorageService } from '../../services/storage/storage.service';
import { Observable } from 'rxjs/Observable';
import { ModalService } from '../../shared/modal/modal.service';

@Component({
  selector: 'tl-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent implements OnInit {

  @Input() user: User;

  followState = 'Follow';
  own = false;

  constructor(
    private storageService: StorageService,
    private followService: FollowService,
    private modalService: ModalService) { }

  ngOnInit() {
    this.own = this.isOwnPost();
    this.getFollowState().subscribe(state => this.followState = state);
  }

  isOwnPost(): boolean {
    const id = this.storageService.fetch('user')['screen_name'];

    if (this.user.screen_name === id) {

      return true;
    }
    return false;
  }

  checkFollow(): Observable<boolean> {
    return new Observable<boolean>(obs => {
      this.followService.checkFollowing(this.user.screen_name)
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

  followClick() {
    console.log(this.user);
  }

  closeModal() {
    this.modalService.close();
  }
}
