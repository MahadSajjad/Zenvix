const fs = require('fs');
const path = require('path');

const WP_URL = 'https://wp.zenvix.net';
const WP_USER = 'zenvix-maigration-2';
const WP_PASS = '9Z8u ZmBk SdZz KEDl 05yc w8cm';
const AUTH_HEADER = 'Basic ' + Buffer.from(WP_USER + ':' + WP_PASS).toString('base64');

const jobs = [
  { id: 145, title: 'Aegis Softtech', acf: { link: 'https://www.aegissofttech.com/', services_used: 'SEO On page and off page\nWeb dev\nKeyword Research' }, image: 'C:\\Users\\Mahad\\.gemini\\antigravity\\brain\\bf66fce3-32c6-4f0f-90ea-a6954113ea0c\\.user_uploaded\\media_1787491122802.png' },
  { id: 143, title: 'InVideo', acf: { link: 'https://invideo.io/', services_used: 'SEO\nWeb dev\nUI/UX Designing\nGuest Posting & Link Building' }, image: 'C:\\Users\\Mahad\\.gemini\\antigravity\\brain\\bf66fce3-32c6-4f0f-90ea-a6954113ea0c\\.user_uploaded\\media_1787491393157.png' },
  { id: 141, title: 'LLC University', acf: { link: 'https://www.llcuniversity.com/', services_used: 'SEO On-Page\nKeyword Research\nContent Marketing' }, image: 'C:\\Users\\Mahad\\.gemini\\antigravity\\brain\\bf66fce3-32c6-4f0f-90ea-a6954113ea0c\\.user_uploaded\\media_1787491451771.png' }
];

async function uploadImage(imagePath) {
  const fileBuffer = fs.readFileSync(imagePath);
  const filename = path.basename(imagePath);
  const res = await fetch(WP_URL + '/wp-json/wp/v2/media', {
    method: 'POST',
    headers: {
      'Authorization': AUTH_HEADER,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': 'image/png'
    },
    body: fileBuffer
  });
  const data = await res.json();
  return data.id;
}

async function updateProject(job, mediaId) {
  const url = `${WP_URL}/wp-json/wp/v2/portfolio/${job.id}`;
  
  const payload = {
    featured_media: mediaId
  };
  
  if (job.acf) {
    payload.acf = job.acf;
  }
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': AUTH_HEADER,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  
  const data = await res.json();
  console.log(`Saved project ${job.title}, status: ${res.status}, ID: ${data.id}`);
}

async function process() {
  for (const job of jobs) {
    console.log('Processing:', job.title);
    try {
      const mediaId = await uploadImage(job.image);
      console.log('Uploaded image, got media ID:', mediaId);
      await updateProject(job, mediaId);
    } catch (e) {
      console.error('Error on', job.title, e.message);
    }
  }
}

process();
