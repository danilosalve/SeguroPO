import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Cadastrar', link: 'Cadastrar' },
    { label: 'Consultar', link: 'Consultar' }
  ];

  constructor(private poStorageService: PoStorageService) {}

}
