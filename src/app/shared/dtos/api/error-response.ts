import { HttpStatusCode } from '@angular/common/http';

export interface IApiErrorResponse {
  error: {
    status: HttpStatusCode;
    statusText: string;
    message: string;
    timestamp: string;
    errorCode: string;
    errors?: string[];
  };
}
