import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PoStorageModule } from '@po-ui/ng-storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    PoStorageModule.forRoot({
      name: 'storageSegurosPO',
      storeName: '_StorageSegurosPO',
      driverOrder: ['lokijs', 'websql', 'indexeddb', 'localstorage']
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
