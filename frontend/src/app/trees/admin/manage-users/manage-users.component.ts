import { Component, Inject, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoService } from '../../_services/user-info.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html'
})
export class AdminManageUsersComponent implements OnInit {
  user: any;
  users: any;
  newUser: any;
  addingUser: any;

  constructor(
    private http: HttpClient,
    private service: UserInfoService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  /**
   * Set data from route resolver
   */
  ngOnInit() {
    this.newUser = {
      firstName: '',
      lastName: '',
      email: ''
    };
    this.titleService.setTitle(
      'Manage users admin | U.S. Forest Service Open Forest'
    );
    this.service.getAll().subscribe(res => {
        this.users = res
    })
    this.route.data.subscribe(data => {
      if (data && data.user) {
        this.user = data.user;
      }
    });
  }

  addUser() {
    // validate newUser object
    if (this.newUser.firstName.length && this.newUser.lastName.length && this.newUser.email.length) {
      this.service.create({
        name: this.newUser.firstName + ' ' + this.newUser.lastName,
        email: this.newUser.email,
        role: 'user',
        forests: []
      }).subscribe(res => {
        window.location.reload()
      })
    } else {
      console.log('missing a field')
    }
  }

  editUser(user) {
    this.router.navigate(['/admin/christmas-trees/manage-users/', user.id]);
  }

}
