import { resolve } from 'path';

export const tempPath = resolve('./temp');

export class ErrorCode {
  public static readonly UNAUTHORIZED= [11001, 'Token expired !'];
  public static readonly BAD_REQUEST = [11002, 'Bad request!'];
  public static readonly AVOID = [11003, 'Something went wrong!'];
  public static readonly NOT_EXIST= [11004, 'Wallet is not exist!'];
}
