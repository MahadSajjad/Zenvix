const WP_URL = 'https://wp.zenvix.net';
const WP_USER = 'zenvix-maigration-2';
const WP_PASS = '9Z8u ZmBk SdZz KEDl 05yc w8cm';
const AUTH_HEADER = 'Basic ' + Buffer.from(WP_USER + ':' + WP_PASS).toString('base64');

async function updateSocials() {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/team?per_page=100`, {
    headers: { 'Authorization': AUTH_HEADER }
  });
  const members = await res.json();
  
  for (const m of members) {
    const acfUpdates = {
      linkedin_url: '',
      linkedin: '',
      twitter_url: '',
      twitter: '',
      github_url: '',
      github: '',
      facebook_url: '',
      facebook: '',
      instagram_url: '',
      instagram: '',
      portfolio_url: '',
      portfolio: ''
    };
    
    // CEO ID is 146
    if (m.id === 146) {
      acfUpdates.linkedin = 'https://www.linkedin.com/in/muhammad-umar-8244573b0/';
    }
    
    // COO ID is 147
    if (m.id === 147) {
      acfUpdates.linkedin = 'https://www.linkedin.com/in/umar-maqsood-b713063b7';
    }
    
    const updateRes = await fetch(`${WP_URL}/wp-json/wp/v2/team/${m.id}`, {
      method: 'POST',
      headers: {
        'Authorization': AUTH_HEADER,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ acf: acfUpdates })
    });
    
    console.log(`Updated ${m.title.rendered}, status: ${updateRes.status}`);
  }
}

updateSocials();
