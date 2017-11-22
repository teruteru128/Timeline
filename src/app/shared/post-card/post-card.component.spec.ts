import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardComponent } from './post-card.component';
import { Post, User } from '../../services/rest/models';
import { DateService } from '../../services/date/date.service';

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCardComponent ],
      providers: [
        DateService
      ]
    })
    .compileComponents();
  }));
});
