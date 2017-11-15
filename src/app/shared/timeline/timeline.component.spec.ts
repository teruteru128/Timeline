import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineComponent } from './timeline.component';
import { PostCardModule } from '../post-card/post-card.module';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/rest/post/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocketIOService } from '../../services/socketio/socket-io.service';
import { APP_DI_CONFIG, APP_CONFIG } from '../../app.config';
import { StorageService } from '../../services/storage/storage.service';
import { NewPostComponent } from '../new-post/new-post.component';
import { ButtonModule } from '../button/button.module';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PostCardModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        TimelineComponent,
        NewPostComponent
      ],
      providers: [
        SocketIOService,
        {provide: APP_CONFIG, useValue: APP_DI_CONFIG},
        PostService,
        StorageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
