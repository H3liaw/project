import { HttpStatus } from '@nestjs/common';

export class SuccessResponseDto {
  constructor(
    data: object |any | Array<any> | string,
    statusCode: HttpStatus = HttpStatus.OK,
  ) {
    this.message = data;
    this.number = Array.isArray(data) ? data.length : 1;
    this.error = false;
    this.statusCode = statusCode;
  }
  message: object | Array<any> | string;
  number: number;
  error: boolean;
  statusCode: HttpStatus;

  public getData() {
    return { message: this.message, number: this.number, error: this.error };
  }
}
