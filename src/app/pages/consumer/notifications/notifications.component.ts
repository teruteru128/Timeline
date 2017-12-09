import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/rest/event/event.service';
import { APIEvent, User, Post } from '../../../services/rest/models';
import { UserService } from '../../../services/rest/user/user.service';
import { PostService } from '../../../services/rest/post/post.service';

@Component({
  selector: 'tl-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  events: APIEvent[] = [];
  initialized = false;

  constructor(
    private eventService: EventService,
    private userService: UserService,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.eventService.getEvents()
      .subscribe((events: APIEvent[]) => {
        events = events.reverse();

        events = events.filter(event => {
          // 取り消しは表示対象外
          return event.type !== 1 && event.type !== 3;
        });

        events = events.map(event => {
            switch (event.type) {
              case 0:
                event.type_str = 'あなたをフォローしました。';
                break;
              case 2:
                event.type_str = 'あなたのポストにいいねをしました。';
                break;
              case 4:
                event.type_str = 'あなたのポストをシェアしました';
                break;
              case 5:
                event.type_str = 'あなたのポストに返信しました。';
                break;
            }
            this.userService.getUserByUserID(event.from_user_id)
            .subscribe((user: User) => {
              event.user = user;
            });
            if (event.post_id !== '') {
              this.postService.getPost(event.post_id)
              .subscribe((post: Post) => {
                event.post = post;
              });
            }

            return event;
        });

        this.initialized = true;

        this.events = events;
      });
  }
}
