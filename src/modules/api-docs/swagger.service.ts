import { Injectable } from '@nestjs/common';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import { SwaggerTransformer } from "@modules/api-docs/swagger-transformer";

@Injectable()
export class SwaggerService {
  private readonly originalSpec: any;

  constructor() {
    try {
      // Load từ file YAML gốc
      const yamlContent = fs.readFileSync(
        path.join(process.cwd(), 'src/swagger/innodata.yaml'),
        'utf8'
      );

      // Parse YAML
      this.originalSpec = yaml.load(yamlContent);

      // Log để debug
      console.log('Original spec loaded:',
        Object.keys(this.originalSpec.paths || {}).length, 'paths found');

    } catch (error) {
      console.error('Error loading swagger:', error);
      throw error;
    }
  }

  getProxySpec() {
    return SwaggerTransformer.transform(this.originalSpec);
  }
}