import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');

let WP_URL = '';
let WP_USER = '';
let WP_PASS = '';

envContent.split('\n').forEach(line => {
  if (line.startsWith('VITE_WORDPRESS_URL=')) WP_URL = line.split('=')[1].trim();
  if (line.startsWith('WP_MIGRATION_USER=')) WP_USER = line.split('=')[1].trim();
  if (line.startsWith('WP_MIGRATION_APP_PASSWORD=')) WP_PASS = line.substring(line.indexOf('=') + 1).trim();
});

const getAuthHeader = () => {
  return 'Basic ' + Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');
};

const fetchWP = (endpoint) => {
  return new Promise((resolve, reject) => {
    const url = `${WP_URL}/wp-json/wp/v2/${endpoint}`;
    https.get(url, {
      headers: {
        'Authorization': getAuthHeader()
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch(e) {
          resolve({ status: res.statusCode, error: e.message, data });
        }
      });
    }).on('error', reject);
  });
};

async function check() {
  console.log("Checking Authors...");
  const users = await fetchWP('users?per_page=100');
  if (users.data && Array.isArray(users.data)) {
    users.data.forEach(u => console.log(`Author: ${u.name} (ID: ${u.id})`));
  } else {
    console.log("Users API error:", users.data);
  }

  console.log("\nChecking Categories (posts)...");
  const cats = await fetchWP('categories?per_page=100');
  if (cats.data && Array.isArray(cats.data)) {
    cats.data.forEach(c => console.log(`Category: ${c.name} (ID: ${c.id})`));
  }

  console.log("\nChecking Portfolio Categories...");
  const pcats = await fetchWP('portfolio-category?per_page=100');
  if (pcats.data && Array.isArray(pcats.data)) {
    pcats.data.forEach(c => console.log(`Portfolio Category: ${c.name} (ID: ${c.id})`));
  }
}

check();
