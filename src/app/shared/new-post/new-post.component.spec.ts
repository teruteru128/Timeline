import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostComponent } from './new-post.component';
import { ButtonModule } from '../button/button.module';
import { FormsModule } from '@angular/forms';

describe('NewPostComponent', () => {
  let component: NewPostComponent;
  let fixture: ComponentFixture<NewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ButtonModule
      ],
      declarations: [ NewPostComponent ]
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
