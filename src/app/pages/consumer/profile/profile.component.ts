import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from '../../../services/rest/user/user.service';
import {Post, User, LoginCallback, EditableProfile} from '../../../services/rest/models';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {PostService} from '../../../services/rest/post/post.service';
import { StorageService } from '../../../services/storage/storage.service';
import { FollowService } from '../../../services/rest/follow/follow.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';

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
    private followService: FollowService,
    private sanitizer: DomSanitizer
  ) { }

  user: User;
  posts: Post[] = [];
  initialized = false;
  err = '';
  myname: string;
  isFollow: boolean;
  editing = false;

  private uploadPendingImage = '';

  private currentProfile: EditableProfile;
  newProfile: EditableProfile;
  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        const id = params.get('id');
        this.getUserByScreenName(id);
        this.checkFollowing(id);
      });
  }

  ngOnDestroy() {
  }

  checkFollowing(screenName: string) {
    this.followService.checkFollowing(screenName)
    .subscribe((flag: boolean) => {
      this.isFollow = flag;
    });
  }

  getUserByScreenName(screenName: string) {
    this.userService.getUserByScreenName(screenName)
    .subscribe(user => {
      this.user = user;
      this.getPosts(user.screen_name);

      this.newProfile = {
        name: user.name,
        url: user.url,
        description: user.description,
        location: user.location
      };

      const storage = this.storageService.fetch('user') as LoginCallback;
      this.myname = storage.screen_name;

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
  }

  getPosts(screenName: string) {
    this.postService.getPosts(screenName)
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        if (posts === null) {

        }
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

  commitProfile() {
    this.userService.updateProfile(this.newProfile)
      .subscribe((resp: User) => {
        this.user = resp;
      }, (err: HttpErrorResponse) => {
        console.error(err);
      });
      if (this.uploadPendingImage !== '') {
        this.userService.updateProfileImage(this.uploadPendingImage)
          .subscribe((resp: User) => {
            this.user.profile_image_url = resp.profile_image_url;
          }, (err: HttpErrorResponse) => {
            console.error(err);
          });
      }
  }

  imageChangeListener($event) {
    this.prepareUploadImage($event.target);
  }

  prepareUploadImage(value: any) {
    const file: File = value.files[0];
    const r: FileReader = new FileReader();

    r.onloadend = (e) => {
      this.uploadPendingImage = r.result;
      this.user.profile_image_url = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(value.files[0])
      ) as string;
    };
    r.readAsDataURL(file);
  }

}
