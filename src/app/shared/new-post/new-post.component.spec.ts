import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostComponent } from './new-post.component';
import { ButtonModule } from '../button/button.module';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/rest/post/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocketIOService } from '../../services/socketio/socket-io.service';
import { APP_CONFIG, APP_DI_CONFIG } from '../../app.config';
import { StorageService } from '../../services/storage/storage.service';

describe('NewPostComponent', () => {
  let component: NewPostComponent;
  let fixture: ComponentFixture<NewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ButtonModule,
        HttpClientTestingModule
      ],
      declarations: [ NewPostComponent ],
      providers: [
        PostService,
        SocketIOService,
        StorageService,
        {provide: APP_CONFIG, useValue: APP_DI_CONFIG}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
