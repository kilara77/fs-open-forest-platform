import { Component, Inject, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  forkJoin } from 'rxjs';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChristmasTreesApplicationService } from '../../_services/christmas-trees-application.service';
import { FormBuilder, Validators } from '@angular/forms';
// import * as moment from 'moment-timezone';
import { ChristmasTreesAdminService } from '../christmas-trees-admin.service';
import { UserInfoService } from '../../_services/user-info.service';
import { environment } from '../../../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class AdminEditUserComponent implements OnInit {
  user: any;
  users: any;
  userToEdit: any;

  constructor(
    private http: HttpClient,
    private service: UserInfoService,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  /**
   * Set data from route resolver
   */
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.service.getOne(id).subscribe(res => {
      if (res) {
        this.userToEdit = res
      }
    })
    this.titleService.setTitle(
      'Edit user admin | U.S. Forest Service Open Forest'
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

  removeUser() {
    this.service.delete(this.userToEdit.id).subscribe(res => {
      if (res) {
        this.router.navigate(['/admin/christmas-trees/manage-users/']);
      }
    })
  }

}
