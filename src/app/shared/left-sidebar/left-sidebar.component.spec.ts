import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidebarComponent } from './left-sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService } from '../../services/storage/storage.service';
import { UserService } from '../../services/rest/user/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_CONFIG, APP_TEST_DI_CONFIG } from '../../app.config';

describe('LeftSidebarComponent', () => {
  let component: LeftSidebarComponent;
  let fixture: ComponentFixture<LeftSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ LeftSidebarComponent ],
      providers: [
        StorageService,
        UserService,
        {provide: APP_CONFIG, useValue: APP_TEST_DI_CONFIG}        
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
