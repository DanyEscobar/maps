
const { writeFileSync, mkdirSync } = require('fs');
require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

const mapKey = process.env['MAP_KEY'];

if (!mapKey) {
  throw new Error('MAP_KEY is no set');
}

const envFileContent = `
export const environment = {
  mapKey: '${mapKey}'
};
`;


mkdirSync('./src/environments', { recursive: true });

writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);