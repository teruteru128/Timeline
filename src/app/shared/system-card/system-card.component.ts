import {Component, OnInit, Input} from '@angular/core';
import {Post, User} from '../../services/rest/models';

@Component({selector: 'tl-system-card', templateUrl: './system-card.component.html', styleUrls: ['./system-card.component.scss']})
export class SystemCardComponent implements OnInit {

  @Input()text = '';
  systemPost : Post;

  constructor() {}

  ngOnInit() {
    const systemUser : User = {
      description: 'システムユーザーです',
      followers: [],
      friends: [],
      id: '0',
      location: 'Gunma Empire',
      name: 'Timeline System',
      official: true,
      posts_count: 0,
      url: 'https://timeline.blue',
      screen_name: '$system',
      profile_image_url: '/assets/img/logo.svg'
    };
    this.systemPost = {
      favorited_ids: [],
      created_at: new Date(),
      id: '0',
      entities: [],
      user: systemUser,
      text: this.text,
      shared_count: 0,
      in_reply_to_screen_name: '',
      favorited: false,
      in_reply_to_user_id: '0',
      shared: false
    };
  }

}
