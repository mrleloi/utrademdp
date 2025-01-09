import { Injectable } from '@nestjs/common';
import { SwaggerTransformer } from '@modules/api-gateway-docs/swagger-transformer';
import { API_IDS } from '@shared/constants';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SwaggerService {
  private swaggerSpecs: Record<string, any> = {};

  getSpec(apiGroupId: keyof typeof API_IDS) {
    const spec = this.swaggerSpecs[apiGroupId];
    if (!spec) {
      throw new Error(
        `Swagger spec for ${apiGroupId} not found. Make sure it was loaded properly.`,
      );
    }
    return SwaggerTransformer.transform(spec);
  }

  loadSpec(pathYaml: string, apiGroupId: keyof typeof API_IDS) {
    try {
      console.log(`Loading swagger spec from ${pathYaml} for ${apiGroupId}...`);
      const yamlContent = fs.readFileSync(
        path.join(process.cwd(), pathYaml),
        'utf8',
      );

      const spec = yaml.load(yamlContent);
      this.swaggerSpecs[apiGroupId] = spec; // Cache the spec
      return spec;
    } catch (error) {
      console.error(`Error loading swagger for ${apiGroupId}:`, error);
      throw error;
    }
  }

  isSpecLoaded(apiGroupId: keyof typeof API_IDS): boolean {
    return !!this.swaggerSpecs[apiGroupId];
  }
}
