/* tslint:disable:no-shadowed-variable prefer-const */


import {mergeMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  forkJoin } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as moment from 'moment/moment';

@Injectable()
export class UserInfoService {
  private endpoint = environment.apiUrl + 'users/';

  constructor(private http: HttpClient) {}

  /**
   * @returns all users
   */
  getAll() {
    return this.http.get(this.endpoint);
  }

  /**
   * @returns user by id
   */
  getOne(id) {
    return this.http.get<any>(this.endpoint + id);
  }

}
