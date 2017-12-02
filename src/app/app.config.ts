import { InjectionToken } from '@angular/core';

export interface AppConfig {
    apiEndpoint: string;
    localStorageToken: string;
}

export const APP_DI_CONFIG: AppConfig = {
    apiEndpoint: 'http://localhost:4000',
    localStorageToken: 'secret' // Change Me
};

export const APP_TEST_DI_CONFIG: AppConfig = {
    apiEndpoint: '',
    localStorageToken: 'secret' // Change Me
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
