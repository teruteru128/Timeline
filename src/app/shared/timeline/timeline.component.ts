import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PostService } from '../../services/rest/post/post.service';
import { Post } from '../../services/rest/models';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import { SocketIOService } from '../../services/socketio/socket-io.service';

@Component({
  selector: 'tl-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {

  @Input() stream: string;
  
  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private sio: SocketIOService) { }

  ngOnInit() {
    switch (this.stream) {
      case 'sample':
      this.postService.listenSampleStream()
      .subscribe(post => {
        this.posts.unshift(post);
      });
    }
  }

  ngOnDestroy() {
    this.sio.disconnect();
  }

}
