import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {
  transform(users, searchText): any[] {
    if (!users) {
      return [];
    }
    if (!searchText) {
      return users;
    }
    searchText = searchText.toLowerCase();

    return users.filter(user => {
      return user.name.toLowerCase().includes(searchText);
    });
   }
}
