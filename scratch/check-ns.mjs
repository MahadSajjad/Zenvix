import https from 'https';
https.get('https://wp.zenvix.net/wp-json/', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log(json.namespaces);
  });
});
