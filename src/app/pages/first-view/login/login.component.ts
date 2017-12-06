import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RandomImageService } from '../random-image/random-image.service';
import { UserService } from '../../../services/rest/user/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import { LoginCallback } from '../../../services/rest/models';

@Component({
  selector: 'tl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('idField') idField: ElementRef;

  bg: string;

  private images = [
    '/assets/bgimgs/1.jpg',
    '/assets/bgimgs/2.jpg',
    '/assets/bgimgs/3.jpg'
  ];

  form = {
    id: '',
    password: ''
  };

  formErr = false;
  errMsg = '';

  constructor(
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private bgService: RandomImageService) { }

  ngOnInit() {
    this.bg = this.bgService.getRandomImage(this.images);

    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('callback') !== null) {
        const param = JSON.parse(params.get('callback')) as LoginCallback;
        this.errMsg = 'アカウントの作成が完了しました';
        this.form.id = param.screen_name;
      }
    });
  }

  onSubmit() {
    this.service.login(this.form.id, this.form.password)
    .subscribe(_ => {
      this.formErr = false;
      this.router.navigate(['']);
    }, (err: HttpErrorResponse) => {
      this.formErr = true;
      this.idField.nativeElement.focus();
      this.form = {
        id: '',
        password: ''
      };
      switch (err.status) {
        case 401: {
          this.errMsg = 'ログインできません。';
          break;
        }
        case 403: {
          this.errMsg = 'アカウントが凍結されています。';
          break;
        }
        case 404: {
          this.errMsg = 'アカウントが登録されていません。';
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
