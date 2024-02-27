import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../database/entities/user.entity';

export const ROLE_KEY = 'role';
export const ForRole = (role: UserRole) => SetMetadata(ROLE_KEY, role);
