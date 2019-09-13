import { Component, Inject, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  forkJoin } from 'rxjs';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { ActivatedRoute } from '@angular/router';
import { ChristmasTreesApplicationService } from '../../_services/christmas-trees-application.service';
import { FormBuilder, Validators } from '@angular/forms';
// import * as moment from 'moment-timezone';
import { ChristmasTreesAdminService } from '../christmas-trees-admin.service';
import { UserInfoService } from '../../_services/user-info.service';
import { environment } from '../../../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html'
})
export class AdminManageUsersComponent implements OnInit {
  user: any;
  users: any;


  constructor(
    private http: HttpClient,
    private service: UserInfoService,
    private titleService: Title,
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

}
