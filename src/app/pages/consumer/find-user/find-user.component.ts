import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/rest/user/user.service';
import { User, Post } from '../../../services/rest/models';
import { ModalSize } from '../../../shared/modal/modal.component';
import { ModalService } from '../../../shared/modal/modal.service';
import { ProfileModalComponent } from '../../../modal/profile-modal/profile-modal.component';

@Component({
  selector: 'tl-find-user',
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.scss']
})
export class FindUserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private modal: ModalService
  ) { }

  modalSize: ModalSize;

  initialized = false;
  users: User[] = [];

  ngOnInit() {
    this.modalSize = {
      width: '410px',
      height: '560px'
    };

    this.getUsers();
  }

  getUsers() {
    this.userService.allUser()
      .subscribe(users => {
        users = users.map(user => {
          if (user.profile_image_url === '') {
            user.profile_image_url = '/assets/img/logo.png';
          }
          return user;
        });
        this.users = users;
        this.initialized = true;
      });
  }

  openProfile(event: User) {
    this.modal.open<User>(ProfileModalComponent, event);
  }

}
