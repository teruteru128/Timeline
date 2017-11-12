import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPageComponent } from './top-page.component';
import { TimelineModule } from '../../shared/timeline/timeline.module';
import { HeaderModule } from '../../shared/header/header.module';
import { LeftSidebarModule } from '../../shared/left-sidebar/left-sidebar.module';

describe('TopPageComponent', () => {
  let component: TopPageComponent;
  let fixture: ComponentFixture<TopPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TimelineModule,
        HeaderModule,
        LeftSidebarModule
      ],
      declarations: [ TopPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
