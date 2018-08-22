import { NgModule, ModuleWithProviders } from '@angular/core';
import { SHARED_SERVICES, APP_INITIALIZER_PROV } from './index';
import { PersistenceModule } from 'angular-persistence';

@NgModule({
  imports: [
    PersistenceModule
  ], declarations : [
  ],
  exports : [
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule:
      CoreModule,
      providers: [
        APP_INITIALIZER_PROV,
        ...SHARED_SERVICES
      ]
    };
  }
}
