/* eslint-disable @typescript-eslint/ban-types */
import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiHeader,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';

export function ApiCommonOkResponse(dto: Type<unknown> | Type<unknown>[]) {
  const isArray = Array.isArray(dto);
  return applyDecorators(
    ApiMarketHeader(),
    ApiExtraModels((isArray ? dto[0] : dto) as Function),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              statusCode: {
                type: 'number',
                example: 200,
              },
              responseTime: {
                type: 'string',
                example: '2024-01-01 23:59:59',
              },
              data: isArray
                ? {
                    type: 'array',
                    items: { $ref: getSchemaPath(dto[0]) },
                  }
                : { $ref: getSchemaPath(dto) },
              errors: {
                type: 'string',
                nullable: true,
                example: null,
              },
            },
          },
        ],
      },
    }),
  );
}

function ApiMarketHeader() {
  return applyDecorators(
    ApiHeader({
      name: 'token',
      description: 'Market api token',
    }),
  );
}
