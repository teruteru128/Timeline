import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()hamburgerClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clicked() {
    this.hamburgerClicked.emit();
  }

}
