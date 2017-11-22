import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindUserComponent } from './find-user.component';
import { ModalModule } from '../../../shared/modal/modal.module';
import { UserService } from '../../../services/rest/user/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_CONFIG, APP_DI_CONFIG } from '../../../app.config';
import { StorageService } from '../../../services/storage/storage.service';

describe('FindUserComponent', () => {
  let component: FindUserComponent;
  let fixture: ComponentFixture<FindUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ModalModule
      ],
      declarations: [ FindUserComponent ],
      providers: [
        UserService,
        {provide: APP_CONFIG, useValue: APP_DI_CONFIG},
        StorageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
