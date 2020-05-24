import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Component({
  selector: 'app-user-management-component',
  templateUrl: './user-management-component.component.html',
  styleUrls: ['./user-management-component.component.css']
})
export class UserManagementComponentComponent implements OnInit {
  title(title: any) {
    throw new Error("Method not implemented.");
  }

  myForm: FormGroup;
  id: AbstractControl;
  userName: AbstractControl;
  cj: AbstractControl;
  users$: Observable<User>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: User;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'id': [''],
      'userName': [''],
      'cj': ['']
    });

    this.id = this.myForm.controls['id'];
    this.userName = this.myForm.controls['userName'];
    this.cj = this.myForm.controls['cj'];
  }


  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'JJ');
  }

  search() {
    if (this.id.value) {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'JJ/' + this.id.value);
    } else {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'JJ');
    }


  }
  add() {
    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'JJ',
      this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('添加成功!');
          }
        });

  }
  delete() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'JJ/' + this.currentUser.id).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功!');
          }
        }
      )
    }

  }

  update() {
    if (!this.currentUser) {
      alert('必须先选择用户');
    } else {
      this.httpClient.put(this.baseUrl + 'JJ', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功!');
          }
        }
      )
    }

  }
  select(u: User) {
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }



}




