import { AuthenticationService } from './authentication.service';
import { ConfigurationService } from './configuration.service';
import { ResourcesService } from './resources.service';
import { StorageService } from './storage.service';
import { APP_INITIALIZER } from '@angular/core';
import { ApiService } from './api.service';
import { SessionStore } from './session/session.store';
import { LoggerService } from './logger/logger.service';
import { LogOptions } from './logger/models/log-options.model';
import { environment } from '../../environments/environment';
import { TranslationService } from './translation.service';
import { NotificationService } from './notification.service';
import { ResizeSvc } from './resize.service';
import { RedirectService } from './redirect.service';
import { ComponentLoader } from './component-loader';
import { EventBusService } from './event-bus.service';
import { SubmitService } from './submit.service';
import { NavigationService } from './navigation.sevice';

export function configServiceFactory(config: ConfigurationService, session: SessionStore, componentLoader: ComponentLoader) {
    const obs = config.load().subscribe();
    return () => obs;
}

export const APP_INITIALIZER_PROV = {
    provide: APP_INITIALIZER,
    useFactory: configServiceFactory,
    deps: [ConfigurationService, SessionStore, ComponentLoader],
    multi: true
};

export const SHARED_SERVICES = [
    AuthenticationService,
    ConfigurationService,
    SessionStore,
    ResourcesService,
    StorageService,
    ApiService,
    { provide: LogOptions, useValue: { level: environment['logLevel'] } },
    LoggerService,
    NotificationService,
    SubmitService,
    TranslationService,
    ResizeSvc,
    RedirectService,
    ComponentLoader,
    NavigationService,
    EventBusService
];
