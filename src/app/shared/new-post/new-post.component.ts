import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/rest/post/post.service';

@Component({
  selector: 'tl-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  inputText = '';

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  checkPostable(): boolean {
    if (this.inputText.length === 0) {
      return false;
    }
    if (this.inputText.length >= 140) {
      return false;
    }
    return true;
  }

  submit() {
    this.postService.post(this.inputText)
      .subscribe(resp => {
        this.inputText = '';
      });
  }
}
