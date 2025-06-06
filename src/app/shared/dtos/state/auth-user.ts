import { TRole } from '../../types/roles';

export interface IAuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleName: TRole;
}
