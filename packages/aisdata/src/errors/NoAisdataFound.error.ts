import { HttpException } from '@nestjs/common';

export class NoAisdataFoundError extends HttpException {
  constructor() {
    super('No ais data found', 404);
  }
}
