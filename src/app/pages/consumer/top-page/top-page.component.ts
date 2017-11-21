import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tl-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.scss']
})
export class TopPageComponent implements OnInit {

  constructor() { }

  spMenuOpened = false;

  ngOnInit() {
  }

  openSpMenu() {
    this.spMenuOpened = true;
  }

  closeSpMenu() {
    this.spMenuOpened = false;
  }
}
