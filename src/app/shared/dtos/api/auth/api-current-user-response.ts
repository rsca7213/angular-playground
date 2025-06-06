import { TRole } from '../../../types/roles';

export interface IApiCurrentUserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleName: TRole;
}
