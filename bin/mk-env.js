const path = require('path');
const fs = require('fs');
const params = process.argv.slice(2);
const envName = params.shift();
params.push('MYSQL_HOST=localhost');
params.push(`NODE_ENV=${envName || 'development'}`);
const fileContent = params.join('\r\n');
fs.writeFileSync(path.resolve(__dirname, `../.env.${envName}`), fileContent);
