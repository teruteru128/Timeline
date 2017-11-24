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
}
