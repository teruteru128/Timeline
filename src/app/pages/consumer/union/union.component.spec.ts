import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnionComponent } from './union.component';
import { PostCardModule } from '../../../shared/post-card/post-card.module';
import { NewPostModule } from '../../../shared/new-post/new-post.module';
import { PostService } from '../../../services/rest/post/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StorageService } from '../../../services/storage/storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../../services/rest/user/user.service';

describe('UnionComponent', () => {
  let component: UnionComponent;
  let fixture: ComponentFixture<UnionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NewPostModule,
        PostCardModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ UnionComponent ],
      providers: [
        PostService,
        StorageService,
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
