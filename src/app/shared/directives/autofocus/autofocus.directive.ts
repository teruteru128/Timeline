import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[autofocus]'
})
export class AutofocusDirective {

  private _autofocus;

  constructor(private el: ElementRef) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    if (this._autofocus || typeof this._autofocus === 'undefined') {
      this.el.nativeElement.focus();
    }

  }

  @Input() set autofocus(condition: boolean)
  {
      this._autofocus = condition !== false;
  }

}
