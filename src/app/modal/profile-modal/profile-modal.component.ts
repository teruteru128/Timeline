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
    const id = this.storageService.fetch('user')['userId'];

    if (this.data.userId === id) {
      this.own = true;
    }

    this.followService.checkFollowing(this.data.user.userId)
    .subscribe(resp => {
      switch (resp) {
        case true:
        this.followState = 'Remove';
        break;
        case false:
        this.followState = 'Follow';
        break;
      }
    });
  }

  followClick() {
  }

}
