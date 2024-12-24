const fs = require('fs');
const dotenv = require('dotenv');

// Carregue o arquivo .env
const envConfig = dotenv.config().parsed;

if (!envConfig) {
  throw new Error('.env file not found. Make sure it exists in the project root.');
}

// Converta as variáveis para o formato Angular
const envFileContent = `
/**
 * Arquivo gerado automaticamente a partir do .env
 * Não edite este arquivo diretamente.
 */
export const environment = {
  ${Object.keys(envConfig)
    .map(key => `${key}: ${isNaN(envConfig[key]) && envConfig[key] !== 'true' && envConfig[key] !== 'false' ? `'${envConfig[key]}'` : envConfig[key]}`)
    .join(',\n  ')}
};
`;

// Salve as variáveis em um arquivo TS
fs.writeFileSync('./src/environments/environment.ts', envFileContent);

console.log('Arquivo environment.ts criado com sucesso.');
