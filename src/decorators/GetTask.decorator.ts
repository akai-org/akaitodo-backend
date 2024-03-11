import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetTask = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (data) return request.task[data];
        return request.task;
    },
);
