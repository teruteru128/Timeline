import { Component, OnInit } from '@angular/core';
import { User, Post } from '../../../services/rest/models';
import { ProfileModalComponent } from '../../../modal/profile-modal/profile-modal.component';
import { ModalService } from '../../../shared/modal/modal.service';
import { Router } from '@angular/router';
import { SocketIOService } from '../../../services/socketio/socket-io.service';
import { PostService } from '../../../services/rest/post/post.service';
import { ModalSize } from '../../../shared/modal/modal.component';
import { AfterViewInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'tl-union',
  templateUrl: './union.component.html',
  styleUrls: ['./union.component.scss']
})
export class UnionComponent implements OnInit, AfterViewInit, OnDestroy {

  modalSize: ModalSize;

    posts: Post[] = [];

    initialized = false;

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
      this.initialized = true;
    }

    checkStream() {
      this.postService.listenUnion()
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
