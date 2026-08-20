const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch(e) {
            resolve({ error: 'parse error', raw: data.substring(0, 100) });
          }
        } else {
          resolve({ error: `HTTP ${res.statusCode}`, raw: data.substring(0, 100) });
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const endpoints = ['services', 'portfolio', 'team', 'posts'];
  for (const ep of endpoints) {
    const url = `https://wp.zenvix.net/wp-json/wp/v2/${ep}`;
    console.log(`\n--- Fetching ${ep} ---`);
    try {
      const data = await fetchJson(url);
      if (Array.isArray(data)) {
        console.log(`Found ${data.length} items`);
        data.forEach(item => {
          console.log(`- ${item.slug}: ${item.title?.rendered} (ID: ${item.id})`);
        });
      } else {
        console.log(data);
      }
    } catch(e) {
      console.log('Error:', e.message);
    }
  }
}

run();
