import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPageComponent } from './top-page.component';
import { TimelineModule } from '../../shared/timeline/timeline.module';
import { HeaderModule } from '../../shared/header/header.module';
import { LeftSidebarModule } from '../../shared/left-sidebar/left-sidebar.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_CONFIG, APP_DI_CONFIG } from '../../app.config';
import { StorageService } from '../../services/storage/storage.service';

describe('TopPageComponent', () => {
  let component: TopPageComponent;
  let fixture: ComponentFixture<TopPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TimelineModule,
        HeaderModule,
        LeftSidebarModule,
        HttpClientTestingModule
      ],
      declarations: [ TopPageComponent ],
      providers: [
        {provide: APP_CONFIG, useValue: APP_DI_CONFIG},
        StorageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
