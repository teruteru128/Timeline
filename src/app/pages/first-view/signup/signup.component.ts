import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RandomImageService } from '../random-image/random-image.service';
import { UserService } from '../../../services/rest/user/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import { MessageResponse, LoginCallback } from '../../../services/rest/models';

@Component({
  selector: 'tl-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('emailField') emailField: ElementRef;

  form = {
    id: '',
    mail: '',
    password: ''
  };

  bg: string;

  private images = [
    '/assets/bgimgs/1.jpg',
    '/assets/bgimgs/2.jpg',
    '/assets/bgimgs/3.jpg'
  ];

  formErr = false;
  errMsg = '';

  constructor(
    private service: UserService,
    private router: Router,
    private bgService: RandomImageService) { }

  ngOnInit() {
    this.bg = this.bgService.getRandomImage(this.images);
  }

  onSubmit() {
    this.service.signup(this.form.id, this.form.mail, this.form.password)
      .subscribe((res: MessageResponse) => {
        this.formErr = false;
        this.service.login(this.form.id, this.form.password)
          .subscribe(_ => {
            this.router.navigate(['']);
          });
      }, (err: HttpErrorResponse) => {
        this.formErr = true;
        this.emailField.nativeElement.focus();
        this.form = {
          id: '',
          mail: '',
          password: ''
        };

        switch (err.status) {
          case 400: {
            this.errMsg = '情報が正しく入力されていません。';
            break;
          }
          case 409: {
            this.errMsg = 'すでに登録されています。';
            break;
          }
          case 500: {
            this.errMsg = 'サーバー内部エラーです。';
            break;
          }
          default: {
            this.errMsg = '不明なエラーです。';
            break;
          }
        }
      });
  }

}
