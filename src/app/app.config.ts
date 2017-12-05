import { InjectionToken } from '@angular/core';

export interface AppConfig {
    apiEndpoint: string;
    localStorageToken: string;
    wsEndpoint: string;
}

export const APP_DI_CONFIG: AppConfig = {
    apiEndpoint: 'http://localhost:4000',
    wsEndpoint: 'ws://localhost:4000/1.0',
    localStorageToken: 'secret' // Change Me
};

export const APP_TEST_DI_CONFIG: AppConfig = {
    apiEndpoint: '',
    wsEndpoint: '',
    localStorageToken: 'secret' // Change Me
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
