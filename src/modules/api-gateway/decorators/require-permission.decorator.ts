/*
import { SetMetadata } from '@nestjs/common';

export const RequirePermission = (...permissions: string[]) => SetMetadata('permissions', permissions);

// src/api-gateway/modules/group1/controllers/group1.controller.ts
@Controller('api/group1')
export class Group1Controller {
  constructor(private readonly group1Service: Group1Service) {}

  @All('products/!*')
  @RequirePermission('products:read')  // Metadata cho permission check
  async handleProducts(@Req() request: Request) {
    return this.group1Service.forwardRequest(request, 'products');
  }
}*/
