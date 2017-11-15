import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tl-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()disabled = false;
  @Input()text = '';

  constructor() { }

  ngOnInit() {
  }

}
