import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  PoPageModule,
  PoDividerModule,
  PoFieldModule,
  PoButtonModule,
  PoWidgetModule,
  PoLoadingModule,
} from '@po-ui/ng-components';

import { FormSeguroComponent } from './form-seguro/form-seguro.component';
import { ListarSegurosComponent } from './listar-seguros/listar-seguros.component';

@NgModule({
  declarations: [FormSeguroComponent, ListarSegurosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PoPageModule,
    PoDividerModule,
    PoFieldModule,
    PoButtonModule,
    PoWidgetModule,
    PoLoadingModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'Cadastrar' },
      { path: 'Cadastrar', component: FormSeguroComponent },
      { path: 'Consultar', component: ListarSegurosComponent },
    ]),
  ],
})
export class SegurosModule {}
