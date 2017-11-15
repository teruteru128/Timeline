import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { ModalService } from './modal.service';
import { Subscription } from 'rxjs/Subscription';

export interface ModalSize {
  width: string;
  height: string;
}

@Component({
  selector: 'tl-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() size: ModalSize;

  @ViewChild('inner', { read: ViewContainerRef }) vcr;
  private subscription: Subscription;
  public display = 'none';

  constructor(private modal: ModalService) { }

  ngAfterViewInit() {
    this.modal.vcr = this.vcr;
  }

  ngOnInit() {
    if (this.size === undefined) {
      this.size = {
        width: '50%',
        height: '50%'
      };
    }

    this.subscription = this.modal.content$.subscribe(
      value => {
        if (value) {
          this.display = '';
        } else {
          this.display = 'none';
        }
      });
  }

  containerClick($event) {
    $event.stopPropagation();
  }

  close() {
    this.modal.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
