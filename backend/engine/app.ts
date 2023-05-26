import express from 'express';
import { loadConfig } from './config';
import { Controller } from './interfaces/controller';
import { wrapFn } from './utils/actions';

export class App {
    private express: express.Application;

    constructor(private controllers: Controller[] = []) {
        loadConfig();
        this.express = express();
        this.express.use(express.json());
        this.registerActions();
    }

    private registerActions() {
        this.controllers.forEach(controller => {
            Object.keys(controller).forEach((method) => {
                Object.keys(controller[method]).forEach(path => {
                    console.log(`Add ${method} action for ${path}`);
                    (this.express as any)[method](path, wrapFn(controller[method][path]));
                })
            });
        })
    }

    listen(port: number) {
        this.express.listen(port, () => {
            console.log(`Application is running http://localhost:${port}/`);
        });
    }
}