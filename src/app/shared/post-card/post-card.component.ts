import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Post } from '../../services/rest/models';
import { DateService } from '../../services/date/date.service';

@Component({
  selector: 'tl-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: Post;
  date: string;
  @Output() profileClicked: EventEmitter<Post> = new EventEmitter();

  constructor(private dateService: DateService) { }

  ngOnInit() {
  }

  updateDate() {
    if (this.post !== undefined) {
      this.date = this.dateService.formatDate(this.post.createdDate);
      setInterval(() => {
        this.date = this.dateService.formatDate(this.post.createdDate);
      }, 30000);
    }
  }

  notProvidedImage() {
    if (this.post.user.avatarUrl === '') {
      this.post.user.avatarUrl = '/assets/img/logo.png';
    }
  }

  profileClick() {
    this.profileClicked.emit(this.post);
  }
}
