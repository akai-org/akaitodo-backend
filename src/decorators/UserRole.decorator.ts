import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/types/enums';

export const ROLE_KEY = 'role';
export const ForRole = (role: UserRole) => SetMetadata(ROLE_KEY, role);
