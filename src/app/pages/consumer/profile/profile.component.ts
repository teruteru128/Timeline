import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from '../../../services/rest/user/user.service';
import {Post, User} from '../../../services/rest/models';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../services/rest/post/post.service';
import {SocketIOService} from '../../../services/socketio/socket-io.service';

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
    private sio: SocketIOService
  ) { }

  user: User;
  posts: Post[] = [];
  initialized = false;

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        const id = params.get('id');
        this.userService.getUserById(id)
          .subscribe(user => {
            this.user = user;
            this.getPosts(user.screen_name);
            this.initialized = true;
          });
      });
  }

  ngOnDestroy() {
    this.sio.disconnect();
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

}
