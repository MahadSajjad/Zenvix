const endpoints = ['pages', 'posts', 'media', 'categories'];
async function test() {
  for (const ep of endpoints) {
    try {
      const res = await fetch('https://zenvix.net/wp-json/wp/v2/' + ep);
      console.log(`Endpoint /wp-json/wp/v2/${ep}: Status ${res.status} ${res.statusText}`);
      if (res.ok) {
        const data = await res.json();
        console.log(`  - Data array length: ${Array.isArray(data) ? data.length : typeof data}`);
        if (Array.isArray(data) && data.length > 0) {
            console.log(`  - Sample ID: ${data[0].id}`);
        }
      }
    } catch(e) {
      console.error('Error fetching ' + ep, e.message);
    }
  }
}
test();
