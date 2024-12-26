const fs = require('fs');
const dotenv = require('dotenv');

// Carrega o .env
const envConfig = dotenv.config().parsed;

// Gera o conteúdo do arquivo environment.ts
const envFileContent = `
export const environment = {
  production: false,
  ${Object.entries(envConfig)
    .map(([key, value]) => `${key}: '${value}'`)
    .join(',\n')}
};
`;

fs.writeFileSync('./src/environments/environment.ts', envFileContent);
console.log('Environment file generated successfully.');
