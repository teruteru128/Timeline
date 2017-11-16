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

  constructor(
    private storageService: StorageService,
    private followService: FollowService) { }

  ngOnInit() {
    if (this.data.sample) {
      this.followState = 'DUMMY';
    }

    this.followService.checkFollowing(this.data.user.userId)
    .subscribe(b => {
      console.log(b);
    });
  }

  followClick() {
  }

}
