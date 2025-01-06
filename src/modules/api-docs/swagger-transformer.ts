export class SwaggerTransformer {
  static transform(originalSpec: any) {
    const spec = JSON.parse(JSON.stringify(originalSpec));

    // Transform paths - thêm prefix một lần duy nhất
    const newPaths: any = {};
    Object.keys(spec.paths || {}).forEach(path => {
      const newPath = `${path}`; // Prefix một lần
      newPaths[newPath] = spec.paths[path];
    });

    return {
      ...spec,
      servers: [{ url: '' }], // Empty base URL vì đã thêm prefix vào paths
      paths: newPaths,
    };
  }
}

