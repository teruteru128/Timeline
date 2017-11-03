import { InjectionToken } from '@angular/core';

export interface AppConfig {
    apiEndpoint: string;
}

export const APP_DI_CONFIG: AppConfig = {
    apiEndpoint: 'http://localhost:3000'
};

export const APP_TEST_DI_CONFIG: AppConfig = {
    apiEndpoint: ''
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
