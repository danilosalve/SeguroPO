import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { MarcaCarroService } from '../../../core/services/marca-carro.service';
import { SeguroService } from '../../../core/services/seguro.service';
import { MarcaCarro } from '../../../models/MarcaCarro';
import { Seguro } from '../../../models/Seguro';

@Component({
  selector: 'app-form-seguro',
  templateUrl: './form-seguro.component.html',
  styleUrls: ['./form-seguro.component.css']
})
export class FormSeguroComponent implements OnInit {

  formSeguro: FormGroup;
  public seguro = new Seguro();
  public marcasCarro$: Observable<MarcaCarro[]>;

  constructor(
    private marcaCarroService: MarcaCarroService,
    private seguroService: SeguroService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.marcasCarro$ = this.marcaCarroService.getMarcas();
    this.createForm();
  }

  createForm(): void {
    this.formSeguro = this.fb.group({
      marcaCarro: [
        this.seguro.marcaCarro,
        Validators.compose([Validators.required]),
      ],
      modeloCarro: [
        this.seguro.modeloCarro,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
        ]),
      ],
      placaCarro: [
        this.seguro.placaCarro,
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
        ]),
      ],
      nomeProprietario: [
        this.seguro.nomeProprietario,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
        ]),
      ],
      sobrenomeProprietario: [
        this.seguro.sobrenomeProprietario,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
        ]),
      ],
      dataNascimentoProprietario: [
        this.seguro.dataNascimentoProprietario
      ]
    });
  }

  salvar(): void {
    this.seguro.id = this.seguro.placaCarro;
    this.seguroService.salvar(this.seguro);
  }

}
