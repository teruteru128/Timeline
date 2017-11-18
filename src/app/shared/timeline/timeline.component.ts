import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { PostService } from '../../services/rest/post/post.service';
import { Post } from '../../services/rest/models';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import { SocketIOService } from '../../services/socketio/socket-io.service';
import { ProfileModalComponent } from '../../modal/profile-modal/profile-modal.component';
import { ModalSize } from '../modal/modal.component';
import { ModalService } from '../modal/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tl-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() stream: string;

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
    switch (this.stream) {
      case 'sample':
      this.postService.listen()
      .subscribe((post: Post) => {
        this.posts.unshift(post);
      }, err => {
        if (err === 'invalid jwt token' || 'not found') {
          console.error('認可情報が確認できなかったため、ご利用できません。');
          this.redirectLogin();
        } else {
          console.error('リアルタイムタイムラインAPIへの接続でエラーが発生しました。');
        }
      });
    }
  }

  redirectLogin() {
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.sio.disconnect();
  }

  openProfile(event: Post) {
    this.modal.open(ProfileModalComponent, event);
  }

  followClickedHandler(event: Post) {
    console.log(event);
  }

}
