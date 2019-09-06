import { Component, Inject, OnInit } from '@angular/core';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { ActivatedRoute } from '@angular/router';
import { ChristmasTreesApplicationService } from '../../_services/christmas-trees-application.service';
import { FormBuilder, Validators } from '@angular/forms';
// import * as moment from 'moment-timezone';
import { ChristmasTreesAdminService } from '../christmas-trees-admin.service';
import { ChristmasTreesInfoService } from '../../_services/christmas-trees-info.service';
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
    private treesAdminService: ChristmasTreesAdminService,
    private service: ChristmasTreesApplicationService,
    private christmasTreesInfoService: ChristmasTreesInfoService,
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
    this.route.data.subscribe(data => {
      if (data && data.user) {
        this.user = data.user;
        this.users = [{
          name: 'Judy Cronan',
          email: 'judy.cronan@usda.gov',
          forests: ['Deschutes and Willamette'],
          access: 'Manage-access'
        }, {
          name: 'Lisa Shenouda',
          email: 'lisa.shenouda@usda.gov',
          forests: ['All forests'],
          access: 'Write-access'
        }];
      }
    });
  }

}
