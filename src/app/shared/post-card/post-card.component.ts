import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../services/rest/models';

@Component({
  selector: 'tl-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: Post;

  @Output() profileClicked: EventEmitter<Post> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (this.post !== undefined) {
      if (this.post.user.avatarUrl === '') {
        this.post.user.avatarUrl = '/assets/img/logo.png';
      }
    }
  }

  profileClick() {
    this.profileClicked.emit(this.post);
  }

}
