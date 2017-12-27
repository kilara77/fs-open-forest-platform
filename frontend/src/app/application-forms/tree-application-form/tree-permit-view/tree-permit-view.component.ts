import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tree-permit-view',
  templateUrl: './tree-permit-view.component.html'
})
export class TreePermitViewComponent implements OnInit {
  forest: any;
  permit: any;
  image: any;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.permit && data.permit.forest) {
        this.forest = data.permit.forest;
        this.permit = data.permit;
        this.titleService.setTitle(
          'View your Christmas tree permit order confirmation for ' +
            data.permit.forest.forestName +
            ' National Forest | U.S. Forest Service Christmas Tree Permitting'
        );
        this.image = this.sanitizer.bypassSecurityTrustHtml(this.permit.permitImage);
      } else {
        this.router.navigate([`/`]);
      }
    });
  }

  printPermit() {
    let printContents, popupWin;
    printContents = document.getElementById('toPrint').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print permit</title>
          <link href="/assets/css/print-permit.css" rel="stylesheet" type="text/css">
        </head>
        <body onload="window.print();window.close();">${printContents}</body>
      </html>
      `);
    popupWin.document.close();
  }
}