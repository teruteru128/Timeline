import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostComponent } from './new-post.component';
import { ButtonModule } from '../button/button.module';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/rest/post/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocketIOService } from '../../services/socketio/socket-io.service';
import { APP_CONFIG, APP_DI_CONFIG } from '../../app.config';
import { StorageService } from '../../services/storage/storage.service';
import { Observable } from 'rxjs/Observable';

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
        {provide: PostService, useClass: PostServiceMock},
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

  it('characters count', async(() => {
    component.inputText = '';
    expect(component.checkPostable()).toBe(false);

    // tslint:disable-next-line:max-line-length
    component.inputText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ma';
    fixture.detectChanges();
    expect(component.checkPostable()).toBe(false);

    component.inputText = 'a';
    fixture.detectChanges();
    expect(component.checkPostable()).toBe(true);
  }));

  it('submit', async(() => {
    component.inputText = 'aaa';
    fixture.detectChanges();
    component.submit();
    fixture.detectChanges();
    expect(component.inputText).toBe('');
  }));
});

class PostServiceMock extends PostService {
  post(text: string): Observable<boolean> {
    return new Observable(obs => obs.next(true));
  }
}
