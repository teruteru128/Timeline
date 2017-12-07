import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from '../../../services/rest/user/user.service';
import {Post, User, LoginCallback} from '../../../services/rest/models';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../services/rest/post/post.service';
import { StorageService } from '../../../services/storage/storage.service';
import { FollowService } from '../../../services/rest/follow/follow.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'tl-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private storageService: StorageService,
    private followService: FollowService
  ) { }

  user: User;
  posts: Post[] = [];
  initialized = false;
  err = '';
  myname: string;
  isFollow: boolean;

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        const id = params.get('id');
        this.userService.getUserById(id)
          .subscribe(user => {
            this.user = user;
            this.getPosts(user.screen_name);

            const storage = this.storageService.fetch('user') as LoginCallback;
            this.myname = storage.screen_name;

            this.followService.checkFollowing(id)
              .subscribe((flag: boolean) => {
                this.isFollow = flag;
              });
            this.initialized = true;
          }, (err: HttpErrorResponse) => {
            switch (err.status) {
              case 404: {
                this.err = 'ユーザーが見つかりません。';
                break;
              }
              default: {
                this.err = 'サーバー内部エラーです。';
                break;
              }
            }
          });
      });
  }

  ngOnDestroy() {
  }

  getPosts(screenName: string) {
    this.postService.getPosts(screenName)
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }


  openProfile(event: Post) {
    this.router.navigate(['/profile/' + event.user.screen_name]);
  }

  follow() {
    this.followService.follow(this.user.screen_name)
      .subscribe(resp => {
        this.isFollow = !this.isFollow;
      }, (err: HttpErrorResponse) => {
        console.error(err);
      });
  }

  unfollow() {
    this.followService.unfollow(this.user.screen_name)
      .subscribe(resp => {
        this.isFollow = !this.isFollow;
      }, (err: HttpErrorResponse) => {
        console.error(err);
      });
  }

}
