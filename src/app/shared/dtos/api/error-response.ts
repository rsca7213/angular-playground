import { HttpStatusCode } from '@angular/common/http';

export interface IApiErrorResponse {
  status: HttpStatusCode;
  statusText: string;
  message: string;
  timestamp: string;
  errorCode: string;
  errors?: string[];
}
