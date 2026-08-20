import { Buffer } from 'node:buffer';

const url = 'https://wp.zenvix.net/wp-json/wp/v2/users/me';
const WP_USER = 'zenvix-migration';
const WP_PASS = '#@5h($qkopSGOXHTcM)aHwy&';
const auth = 'Basic ' + Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');

async function testAuth() {
  const res = await fetch(url, {
    headers: {
      'Authorization': auth,
      'User-Agent': 'Mozilla/5.0'
    }
  });
  console.log('Authorization Header:', auth);
  console.log('Status:', res.status);
  console.log('Body:', await res.text());
}

testAuth();
