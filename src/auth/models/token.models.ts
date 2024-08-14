import { Role } from '../../users/entities/role.entity';

export interface PayloadToken {
  role: Role;
  email: string;
  sub: string;
}
