// src/common/decorators/user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((Data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user;
});
