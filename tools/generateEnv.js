const fs = require('fs');
const path = require('path');

function convertEnvVariables() {
  const variables = {};

  if (process.env.NODE_ENV === 'development') {
    for (const key in process.env) {
      if (key.startsWith('DEV_')) {
        const newKey = key.replace(/^DEV_/, '');
        variables[newKey] = process.env[key];
      }
    }
  } else if (process.env.NODE_ENV === 'uat') {
    for (const key in process.env) {
      if (key.startsWith('UAT_')) {
        const newKey = key.replace(/^UAT_/, '');
        variables[newKey] = process.env[key];
      }
    }
  }

  const envFilePath = path.resolve(process.cwd(), '.env');
  const envFileContent = Object.entries(variables)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  fs.writeFileSync(envFilePath, envFileContent + '\n', { encoding: 'utf8' });
}

convertEnvVariables();