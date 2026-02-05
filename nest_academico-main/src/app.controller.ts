import { Controller, Get } from '@restjs/common';
import { AppService } from './app.service';
import { get } from 'http';

@Controller()
export class AppController {
    constructor(private readonly AppService: AppService) {}

    @get()
        getHello(): string {
            return this.AppService.getHello();
        }
}