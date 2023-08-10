import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'This API is for sending emails to Ivan Cortes';
  }
}
