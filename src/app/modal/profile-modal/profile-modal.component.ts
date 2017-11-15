import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../services/rest/models';

@Component({
  selector: 'tl-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent implements OnInit {

  @Input() data: Post;

  constructor() { }

  ngOnInit() {
  }

}
