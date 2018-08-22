import { NgModule } from '@angular/core';
import { SHARED_MODULES, SHARED_COMPONENTS, SHARED_DIRECTIVES } from './index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports:      [
        ...SHARED_MODULES,
        NgbModule.forRoot(),
    ],
    declarations: [
        ...SHARED_COMPONENTS,
        ...SHARED_DIRECTIVES
    ],
    exports: [
        NgbModule,
        ...SHARED_COMPONENTS,
        ...SHARED_DIRECTIVES,
        ...SHARED_MODULES],
    providers: [
    ]
  })

  export class SharedModule { }
