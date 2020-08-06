import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PoNotificationService } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';

import { Seguro } from 'src/app/models/Seguro';
import { OnlineOfflineService } from './online-offline.service';

@Injectable({
  providedIn: 'root',
})
export class SeguroService {
  private readonly API_SEGUROS = 'http://localhost:9000';
  private todosSeguros;

  constructor(
    private http: HttpClient,
    private onlineOfflineService: OnlineOfflineService,
    private poNotification: PoNotificationService,
    private poStorageService: PoStorageService) {
      this.ouvirStatusConexao();
    }

    private salvarAPI(seguro: Seguro): void {
      this.http.post(this.API_SEGUROS + '/api/seguros', seguro).subscribe(
        () => this.poNotification.success('Seguro foi cadastrado com sucesso'),
        (err) => this.poNotification.error('Falha ao cadastrar seguro!')
      );
    }

    // tslint:disable-next-line: typedef
    private async salvarStorage(seguro: Seguro) {
      try {
        await this.poStorageService.appendItemToArray('seguros', seguro).then(() => {});
        this.poNotification.warning('Seguro pendente de sincronização');
      } catch (error) {
        this.poNotification.error('Falha ao incluir Seguro Offline!');
        console.log('Erro ao incluir seguro no IndexedDb', error);
      }
    }

    // tslint:disable-next-line: typedef
    private async enviarStorageParaApi() {
      await this.poStorageService.get('seguros').then( seguros => { this.todosSeguros = seguros; });
      for (const seguro of this.todosSeguros){
        this.salvarAPI(seguro);
        await this.poStorageService.removeItemFromArray('seguros', 'placaCarro', seguro.placaCarro);
      }
    }

    salvar(seguro: Seguro): void {
      if (this.onlineOfflineService.isOnline) {
        this.salvarAPI(seguro);
      } else {
        this.salvarStorage(seguro);
      }
    }

    listar(): Observable<Seguro[]> {
      return this.http.get<Seguro[]>(this.API_SEGUROS + '/api/seguros');
    }

    private ouvirStatusConexao(): void {
      this.onlineOfflineService.statusConexao
      .subscribe(online => {
        if (online) {
          this.poNotification.information('Sincronizando Seguros');
          this.enviarStorageParaApi();
        } else {
          this.poNotification.information('Trabalhando Offline :(');
        }
      });
    }
}
