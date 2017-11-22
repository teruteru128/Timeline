import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {
  public vcr: ViewContainerRef;
  private currentComponent = null;

  private contentSource: Subject<boolean> = new Subject<boolean>();
  public content$= this.contentSource.asObservable();

  constructor(private resolver: ComponentFactoryResolver) { }

  open<T>(comp: any, arg: T): void {
    if (!comp) {
      return;
    }

    const factory = this.resolver.resolveComponentFactory(comp);
    const component = this.vcr.createComponent(factory);
    component.instance['user'] = arg;

    // if other modal container is created
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = component;
    this.contentSource.next(true);
  }

  close(): void {
    if (this.currentComponent) {
      this.currentComponent.destroy();
      this.contentSource.next(false);
    }
  }
}
