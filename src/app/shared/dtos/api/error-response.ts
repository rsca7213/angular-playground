import { HttpStatusCode } from '@angular/common/http';

export interface ApiErrorResponse {
  status: HttpStatusCode;
  statusText: string;
  message: string;
  timestamp: string;
  errorCode: string;
  errors?: string[];
}
