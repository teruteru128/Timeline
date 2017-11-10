import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/rest/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tl-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form = {
    id: '',
    mail: '',
    password: ''
  };

  formErr = false;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.service.signup(this.form.id, this.form.mail, this.form.password)
    .subscribe(res => {
      this.formErr = false;
      this.router.navigate(['/login']);
    }, err => {
      this.formErr = true;
      this.form = {
        id: '',
        mail: '',
        password: ''
      };
    });
  }

}
