import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { ModalSize } from '../../../shared/modal/modal.component';
import { Post, User } from '../../../services/rest/models';
import { PostService } from '../../../services/rest/post/post.service';
import { SocketIOService } from '../../../services/socketio/socket-io.service';
import { ModalService } from '../../../shared/modal/modal.service';
import { ProfileModalComponent } from '../../../modal/profile-modal/profile-modal.component';

@Component({
  selector: 'tl-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy, AfterViewInit {

  modalSize: ModalSize;

  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private sio: SocketIOService,
    private modal: ModalService,
    private router: Router) { }

  ngOnInit() {
    this.modalSize = {
      width: '410px',
      height: '560px'
    };
  }

  ngAfterViewInit() {
    this.checkStream();
  }

  checkStream() {
    this.postService.listen()
    .subscribe((post: Post) => {
      this.posts.unshift(post);
    }, err => {
      if (err === 'invalid jwt token' || 'not found') {
        console.error('認可情報が確認できなかったため、ご利用できません。');
        this.router.navigate(['login']);
      } else {
        console.error('リアルタイムタイムラインAPIへの接続でエラーが発生しました。');
      }
    });
}

  ngOnDestroy() {
    this.sio.disconnect();
  }

  openProfile(event: Post) {
    this.modal.open<User>(ProfileModalComponent, event.user);
  }

}
