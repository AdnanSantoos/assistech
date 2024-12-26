const fs = require('fs');
const dotenv = require('dotenv');

function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

// Carregue o arquivo .env ou .env.example
let envConfig;
if (fileExists('.env')) {
  envConfig = dotenv.config().parsed;
} else if (fileExists('.env.example')) {
  console.warn('.env file not found. Using .env.example as fallback.');
  envConfig = dotenv.config({ path: '.env.example' }).parsed;
} else {
  throw new Error('.env or .env.example file not found. Make sure one of them exists in the project root.');
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
