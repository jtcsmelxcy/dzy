import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^a/)) {
    return { invalidUser: true };
  }
}

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  //对应登录的表单
  myForm: FormGroup;

  //输入用户名的输入控件
  userName: AbstractControl;

  //输入密码的输入控件
  password: AbstractControl;

  name$: Observable<string>;
  baseUrl = 'http://127.0.0.1:8080/';

  constructor(private fb: FormBuilder, private authService: AuthService, private httpClient: HttpClient, private router: Router) {
    this.myForm = this.fb.group(
      {
        'userName': ['', Validators.compose([Validators.required, userNameValidator])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      }
    );
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      console.log(val);
    });
  }
  ngOnInit(): void {
  }
  login() {
    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'yhm',
      this.myForm.value).subscribe(
        (val: any) => {
          console.log(val);
          if (val.succ) {
            this.authService.login();
            this.router.navigate(['/management']);
          }
        });
    //  {  sendLogin(this.userName.trim(), this.password.trim());}

  }

  onSubmit(value: any) {
    console.log(value);
  }

}


