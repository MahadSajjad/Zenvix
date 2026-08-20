import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');

let WP_USER = '';
let WP_PASS = '';

envContent.split('\n').forEach(line => {
  if (line.startsWith('WP_MIGRATION_USER=')) WP_USER = line.split('=')[1].trim();
  if (line.startsWith('WP_MIGRATION_APP_PASSWORD=')) WP_PASS = line.substring(line.indexOf('=') + 1).trim();
});

const AUTH_HEADER = 'Basic ' + Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');
const hasAuth = !!WP_USER && !!WP_PASS;

async function runTests() {
  const url = 'https://wp.zenvix.net/wp-json/wp/v2/users/me';

  console.log("=== Test 1: WITH Authentication ===");
  try {
    const resAuth = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': AUTH_HEADER
      }
    });
    console.log(`HTTP Status: ${resAuth.status}`);
    console.log(`Response Body: ${await resAuth.text()}`);
    console.log(`Authorization header constructed: ${hasAuth}`);
  } catch (err) {
    console.error(err);
  }

  console.log("\n=== Test 2: WITHOUT Authentication ===");
  try {
    const resNoAuth = await fetch(url, {
      method: 'GET'
    });
    console.log(`HTTP Status: ${resNoAuth.status}`);
    console.log(`Response Body: ${await resNoAuth.text()}`);
    console.log(`Authorization header constructed: false`);
  } catch (err) {
    console.error(err);
  }
}

runTests();
