import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LoggerService } from './logger/logger.service';
import { environment } from '../../environments/environment.prod';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private logger: LoggerService) {
    }

    handleError(error) {
        console.log('handleError', error);
        const message = error.message ? error.message : error.toString();
        if (!environment.production) {
            this.logger.log(message);
        } else {
            this.logger.log(message, environment.globalErrorHandlerMessage);
        }
        // throw error;
    }
}
