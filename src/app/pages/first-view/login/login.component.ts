import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RandomImageService } from '../random-image/random-image.service';
import { UserService } from '../../../services/rest/user/user.service';
import {HttpErrorResponse} from '@angular/common/http';

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

  constructor(
    private service: UserService,
    private router: Router,
    private bgService: RandomImageService) { }

  ngOnInit() {
    this.bg = this.bgService.getRandomImage(this.images);
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
    });
  }

}
