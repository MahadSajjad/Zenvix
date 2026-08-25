const fs = require('fs');
const path = require('path');

const WP_URL = 'https://wp.zenvix.net';
const WP_USER = 'zenvix-maigration-2';
const WP_PASS = '9Z8u ZmBk SdZz KEDl 05yc w8cm';
const AUTH_HEADER = 'Basic ' + Buffer.from(WP_USER + ':' + WP_PASS).toString('base64');

async function uploadImage(imagePath) {
  const fileBuffer = fs.readFileSync(imagePath);
  const filename = path.basename(imagePath);
  const res = await fetch(WP_URL + '/wp-json/wp/v2/media', {
    method: 'POST',
    headers: {
      'Authorization': AUTH_HEADER,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': 'image/jpeg'
    },
    body: fileBuffer
  });
  if (!res.ok) {
     throw new Error("Failed to upload image: " + res.statusText);
  }
  const data = await res.json();
  return data.id;
}

async function createTeamMember(job, mediaId) {
  const payload = {
    title: job.title,
    status: 'publish',
    featured_media: mediaId,
    acf: job.acf
  };
  
  const res = await fetch(WP_URL + '/wp-json/wp/v2/team', {
    method: 'POST',
    headers: {
      'Authorization': AUTH_HEADER,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  
  if (!res.ok) {
     throw new Error("Failed to create member: " + await res.text());
  }
  const data = await res.json();
  console.log(`Saved team member ${job.title}, status: ${res.status}, ID: ${data.id}`);
}

async function process() {
  const job = { 
    title: 'Hassan Asghar', 
    slug: 'hassan-asghar', 
    acf: { role: 'Search engine optimization specialist', display_order: '8' }, 
    image: 'C:\\Users\\Mahad\\.gemini\\antigravity\\brain\\9cbc9529-6bdd-4ca1-a3db-c43d45cd3435\\.user_uploaded\\media_1787664318511.jpg' 
  };

  console.log('Processing:', job.title);
  try {
    const mediaId = await uploadImage(job.image);
    console.log('Uploaded image, got media ID:', mediaId);
    await createTeamMember(job, mediaId);
  } catch (e) {
    console.error('Error on', job.title, e.message);
  }
}

process();
