import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineComponent } from './timeline.component';
import { PostCardModule } from '../../../shared/post-card/post-card.module';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../services/rest/post/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StorageService } from '../../../services/storage/storage.service';
import { NewPostComponent } from '../../../shared/new-post/new-post.component';
import { ButtonModule } from '../../../shared/button/button.module';
import { Observable } from 'rxjs/Observable';
import { Post, User } from '../../../services/rest/models';
import { RouterTestingModule } from '@angular/router/testing';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PostCardModule,
        FormsModule,
        HttpClientTestingModule,
        ButtonModule,
        RouterTestingModule
      ],
      declarations: [
        TimelineComponent,
        NewPostComponent
      ],
      providers: [
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
