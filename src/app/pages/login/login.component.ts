import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../services/rest/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('idField') idField: ElementRef;

  form = {
    id: '',
    password: ''
  };

  formErr = false;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.service.login(this.form.id, this.form.password)
    .subscribe(res => {
      this.formErr = false;
      this.router.navigate(['']);
    }, err => {
      this.formErr = true;
      this.idField.nativeElement.focus();
      this.form = {
        id: '',
        password: ''
      };
    });
  }

}
