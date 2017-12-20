import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemCardComponent } from './system-card.component';
import { PostCardModule } from '../post-card/post-card.module';
import { LikeService } from '../../services/rest/like/like.service';
import { StorageService } from '../../services/storage/storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SystemCardComponent', () => {
  let component: SystemCardComponent;
  let fixture: ComponentFixture<SystemCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PostCardModule,
        HttpClientTestingModule
      ],
      declarations: [ SystemCardComponent ],
      providers: [
      LikeService,
      StorageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
