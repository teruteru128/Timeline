import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Post } from '../../services/rest/models';
import { DateService } from '../../services/date/date.service';
import { LikeService } from '../../services/rest/like/like.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'tl-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: Post;
  date: string;
  @Output() profileClicked: EventEmitter<Post> = new EventEmitter();

  constructor(
    private dateService: DateService,
    private likeService: LikeService
  ) { }

  ngOnInit() {
    this.updateDate();
  }

  updateDate() {
    /*
    this.date = this.dateService.formatDate(this.post.created_at);
    setInterval(() => {
      this.date = this.dateService.formatDate(this.post.created_at);
    }, 30000);
    */
  }

  profileClick() {
    this.profileClicked.emit(this.post);
  }

  like() {
    this.likeService.like(this.post.id)
      .subscribe((resp: Post) => {
        this.post.favorited = true;
      }, (err: HttpErrorResponse) => {
        console.error(err);
      });
  }

  dislike() {
    this.likeService.dislike(this.post.id)
      .subscribe((resp: Post) => {
        this.post.favorited = false;
      }, (err: HttpErrorResponse) => {
        console.error(err);
      });
  }
}
