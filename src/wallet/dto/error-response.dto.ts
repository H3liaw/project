import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'src/base/constants';

export class ResponseErrorDto {
  constructor(error: ErrorCode, statusCode: HttpStatus) {
    this.message = error[0];
    this.number = error[1];
    this.error = true;
    this.statusCode = statusCode;
  }
  message: string;
  number: number;
  error: boolean;
  statusCode: HttpStatus;

  public getData() {
    return { message: this.message, number: this.number, error: this.error };
  }
}
