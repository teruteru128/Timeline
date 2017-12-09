import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage/storage.service';
import { UserService } from '../../../services/rest/user/user.service';
import { LoginCallback } from '../../../services/rest/models';
import { Router } from '@angular/router';

@Component({
  selector: 'tl-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.scss']
})
export class TopPageComponent implements OnInit {

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ) { }

  spMenuOpened = false;

  ngOnInit() {
    // ユーザーが存在するか確認する
    const storage = this.storageService.fetch('user') as LoginCallback;
    const userId = storage.screen_name;
    this.userService.getUserByScreenName(userId).subscribe(user => {
    }, err => {
      // ユーザーが有効ではない
      console.error('アカウントが凍結されています。ご利用を続行できません。');
      this.storageService.delete('user');
      this.router.navigate(['/login']);
    });

  }

  openSpMenu() {
    this.spMenuOpened = true;
  }

  closeSpMenu() {
    this.spMenuOpened = false;
  }
}
