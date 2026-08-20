import https from 'https';

https.get('https://wp.zenvix.net/wp-json/wp/v2/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.routes) {
        const appPassRoutes = Object.keys(json.routes).filter(r => r.includes('application-password'));
        console.log('Application Password Routes:', appPassRoutes);
      } else {
        console.log('No routes found in response.');
      }
    } catch(e) {
      console.log('Error parsing JSON');
    }
  });
}).on('error', err => console.log(err));
