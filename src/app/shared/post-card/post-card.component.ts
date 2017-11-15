import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../services/rest/models';

@Component({
  selector: 'tl-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: Post;

  constructor() { }

  ngOnInit() {
    if (this.post !== undefined) {
      if (this.post.user.avatarUrl === '') {
        this.post.user.avatarUrl = '/assets/img/logo.png';
      }
    }
  }

}
