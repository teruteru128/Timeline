import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/rest/post/post.service';
import { UserService } from '../../services/rest/user/user.service';
import { User, LoginCallback } from '../../services/rest/models';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'tl-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  inputText = '';
  postError = '';

  initialized = false;

  me: User;

  private pressedKeys = [];

  constructor(
    private postService: PostService,
    private userService: UserService,
    private storageService: StorageService) { }

  ngOnInit() {
    const storage = this.storageService.fetch('user') as LoginCallback;
    const userId = storage.screen_name;
    this.userService.getUserByScreenName(userId).subscribe(user => {
      this.me = user;
      this.initialized = true;
    });

  }

  checkPostable(): boolean {
    if (this.inputText.length === 0) {
      return false;
    }
    if (this.inputText.length >= 140) {
      return false;
    }
    return true;
  }

  submit() {
    this.postError = '';
    this.postService.post(this.inputText)
      .subscribe(resp => {
        this.inputText = '';
      }, err => {
        this.postError = 'サーバーエラーです。';
        this.inputText = '';
      });
  }

  onKeyup(evt) {
    if (this.pressedKeys.length > 2) {
      this.pressedKeys = [];
    }

    this.pressedKeys.push(evt.code);

    if (this.pressedKeys[0] === 'Enter' && this.pressedKeys[1] === 'ControlLeft') {
      this.submit();
    } else if (this.pressedKeys[0] === 'ControlLeft' && this.pressedKeys[1] === 'Enter') {
      this.submit();
    }
  }
}
