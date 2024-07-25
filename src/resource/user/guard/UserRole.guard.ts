import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'src/decorators';
import { UserRole } from 'src/types';

@Injectable()
export class UserRoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.getAllAndOverride<UserRole>(
            ROLE_KEY,
            [context.getHandler(), context.getClass()],
        );
        const isRoleUnspecified: boolean = !requiredRole;
        if (isRoleUnspecified) return true;

        const { user } = context.switchToHttp().getRequest();
        return user.role == requiredRole;
    }
}
