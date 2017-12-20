import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RandomImageService } from '../random-image/random-image.service';
import { UserService } from '../../../services/rest/user/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import { LoginCallback } from '../../../services/rest/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('idField') idField: ElementRef;

  private images = [
    '/assets/bgimgs/1.jpg',
    '/assets/bgimgs/2.jpg',
    '/assets/bgimgs/3.jpg'
  ];

  form = {
    id: '',
    password: ''
  };

  constructor(
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('callback') !== null) {
        const param = JSON.parse(params.get('callback')) as LoginCallback;
        this.form.id = param.screen_name;
      }
    });
  }

  onSubmit() {
    this.service.login(this.form.id, this.form.password)
    .subscribe(_ => {
      this.router.navigate(['']);
    }, (err: HttpErrorResponse) => {
      this.idField.nativeElement.focus();
      this.form = {
        id: '',
        password: ''
      };
      switch (err.status) {
        case 401: {
          this.openSnackBar('ログインできません。', 'OK', 'errorSnack');
          break;
        }
        case 403: {
          this.openSnackBar('アカウントが凍結されています。', 'OK', 'errorSnack');
          break;
        }
        case 404: {
          this.openSnackBar('アカウントが登録されていません。', 'OK', 'errorSnack');
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
