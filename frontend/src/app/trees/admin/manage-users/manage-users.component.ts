import { Component, Inject, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoService } from '../../_services/user-info.service';
import { Title } from '@angular/platform-browser';
import { FilterUsersPipe } from '../../_pipes/filter-users.pipe';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html'
})
export class AdminManageUsersComponent implements OnInit {
  user: any;
  users: any;
  addingUser: false;

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
    this.addingUser = true;
  }

  editUser(user) {
    this.router.navigate(['/admin/christmas-trees/manage-users/', user.id]);
  }

}
