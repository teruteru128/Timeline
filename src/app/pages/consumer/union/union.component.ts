import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../services/rest/models';
import { Router } from '@angular/router';
import { SocketIOService } from '../../../services/socketio/socket-io.service';
import { PostService } from '../../../services/rest/post/post.service';

@Component({
  selector: 'tl-union',
  templateUrl: './union.component.html',
  styleUrls: ['./union.component.scss']
})
export class UnionComponent implements OnInit, OnDestroy {

    posts: Post[] = [];

    initialized = false;

    constructor(
      private postService: PostService,
      private router: Router) { }

    ngOnInit() {
      this.checkStream();
      this.initialized = true;
    }

    checkStream() {
      this.postService.listenUnion()
      .subscribe((post: Post) => {
        this.posts.unshift(post);
        this.initialized = true;
      }, err => {
        console.error('リアルタイムタイムラインAPIへの接続でエラーが発生しました。');
      });
  }

    ngOnDestroy() {
      this.postService.disconnect();
    }

    openProfile(event: Post) {
      this.router.navigate(['/profile/' + event.user.screen_name]);
    }

  }
