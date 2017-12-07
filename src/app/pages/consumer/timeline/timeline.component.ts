import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import {LoginCallback, Post} from '../../../services/rest/models';
import { PostService } from '../../../services/rest/post/post.service';
import {StorageService} from '../../../services/storage/storage.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'tl-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy, AfterViewInit {

  posts: Post[] = [];
  private sub: Subscription;

  constructor(
    private postService: PostService,
    private storageService: StorageService,
    private router: Router) {}

  ngOnInit() {
    const user: LoginCallback = this.storageService.fetch('user');
    this.postService.getHomePosts()
      .subscribe((posts: Post[]) => {
        if (posts !== null) {
          this.posts = posts;
        }
      });
  }

  getStream() {
    this.sub = this.postService.listen()
      .subscribe((post: Post) => {
        this.posts.unshift(post);
      }, err => {
        console.error('リアルタイムタイムラインAPIへの接続でエラーが発生しました。');
      });
  }

  ngAfterViewInit() {
    this.getStream();
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openProfile(event: Post) {
    this.router.navigate(['/profile/' + event.user.screen_name]);
  }

}
