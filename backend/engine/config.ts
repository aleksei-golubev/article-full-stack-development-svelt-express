import * as fs from 'node:fs';

let config: any = {};

export function loadConfig(): void {
    console.log('Load configuration');
    config = JSON.parse(fs.readFileSync('./config.json').toString('utf8'));
    console.log(config);
}

export function getConfig(): any {
    return config;
}

export function getProperty(key: string): any {
    return config[key];
}