import { InjectionToken } from '@angular/core';

export interface AppConfig {
    apiEndpoint: string;
    localStorageToken: string;
    wsEndpoint: string;
}

export const APP_DI_CONFIG: AppConfig = {
    apiEndpoint: 'https://kittentlapi.herokuapp.com',
    wsEndpoint: 'wss://kittentlapi.herokuapp.com/1.0',
    localStorageToken: '1cUmUFcia8Z9xx2msfvI5G7ovcc3u7rG' // Change Me
};

export const APP_TEST_DI_CONFIG: AppConfig = {
    apiEndpoint: '',
    wsEndpoint: '',
    localStorageToken: 'ZG1itDvZtTPzVyZkB9aijxFNMv9mZ7qx' // Change Me
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
