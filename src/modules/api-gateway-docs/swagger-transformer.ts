export class SwaggerTransformer {
  static transform(originalSpec: any) {
    const spec = JSON.parse(JSON.stringify(originalSpec));

    const newPaths: any = {};
    Object.keys(spec.paths || {}).forEach((path) => {
      const newPath = `${path}`;
      newPaths[newPath] = spec.paths[path];
    });

    return {
      ...spec,
      servers: [{ url: '' }],
      paths: newPaths,
    };
  }
}
