import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

    isLoading: boolean;
    isOpenModal: boolean;
    errorText: string;
    constructor() {
    }

    showError(error: string) {
        this.errorText = error;
        this.isOpenModal = true;
        this.isLoading = false;
    }
}
