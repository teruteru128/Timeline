import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RandomImageService } from '../random-image/random-image.service';
import { UserService } from '../../../services/rest/user/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import { MessageResponse, LoginCallback } from '../../../services/rest/models';
import { MatSnackBar } from '@angular/material';

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

  private images = [
    '/assets/bgimgs/1.jpg',
    '/assets/bgimgs/2.jpg',
    '/assets/bgimgs/3.jpg'
  ];

  constructor(
    private service: UserService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit() {
    this.service.signup(this.form.id, this.form.mail, this.form.password)
      .subscribe((res: MessageResponse) => {
        this.router.navigate(['']);
      }, (err: HttpErrorResponse) => {
        this.emailField.nativeElement.focus();
        this.form = {
          id: '',
          mail: '',
          password: ''
        };

        switch (err.status) {
          case 400: {
            this.openSnackBar('情報を確認してください。', 'OK', 'errorSnack');
            break;
          }
          case 409: {
            this.openSnackBar('すでに登録されています。', 'OK', 'errorSnack');
            break;
          }
          case 500: {
            this.openSnackBar('サーバー内部エラーです。', 'OK', 'errorSnack');
            break;
          }
          default: {
            this.openSnackBar('原因不明なエラーが発生しました。', 'OK', 'errorSnack');
            break;
          }
        }
      });
  }

  openSnackBar(message: string, action: string, extraClass: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: extraClass
    });
  }
}
