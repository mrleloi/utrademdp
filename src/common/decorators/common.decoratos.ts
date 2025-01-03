function createApiResponse(statusCode: number, description: string) {
  return {
    [statusCode]: {
      description: description,
    },
  };
}

export const commonDecorators = {
  ...createApiResponse(400, 'Bad Request'),
  ...createApiResponse(401, 'Unauthorized'),
  ...createApiResponse(403, 'Forbidden'),
  ...createApiResponse(404, 'Not Found'),
  ...createApiResponse(500, 'Internal Server Error'),
};
