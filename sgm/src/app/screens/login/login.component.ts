import { Component, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

import { UserService } from 'src/app/services/UserService.service';

import { AppConfig } from 'src/app/enums/app-config';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  obSub!: Subscription;

  formGroup!: FormGroup;

  copyRight: string = AppConfig.CopyRight;
  title: string = AppConfig.Title;

  ngOnInit(): void {
    this.setupFormGroup();
  }

  setupFormGroup() {
    this.formGroup = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  siginIn() {
    let username = this.formGroup.get('username')?.value;
    let password = this.formGroup.get('password')?.value;

    this.validateUser(username, password);
  }

  validateUser(username: string, password: string) {
    this.obSub = this.userService.getUsers().subscribe(
      (data) => {
        let userList: User[] = data;
        let userObj: any;

        userObj = userList.find((obj) => {
          return obj.username.toLowerCase() === username.toLowerCase();
        });

        if (userObj != undefined && userObj != null) {
          alert('found');
        } else {
          alert('not found');
        }
      },
      (error) => {
        //error
      },
      () => {
        //complete
      }
    );
  }
}
