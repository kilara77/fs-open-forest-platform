import { Component, Input } from '@angular/core';
import {LineBreakFormatterPipe} from '../../../../_pipes/line-break-formatter.pipe';
import {FilterPipe} from '../../../../_pipes/filter.pipe';

@Component({
  selector: 'app-tree-contact-info',
  templateUrl: './contact-info.component.html',
  providers: [FilterPipe, LineBreakFormatterPipe]
})
export class ContactInfoComponent {
  @Input() forest: any;
}
