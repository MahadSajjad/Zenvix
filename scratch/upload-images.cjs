const fs = require('fs');
const path = require('path');
const WP_URL = 'https://wp.zenvix.net';
const WP_USER = 'zenvix-maigration-2';
const WP_PASS = '9Z8u ZmBk SdZz KEDl 05yc w8cm';
const AUTH_HEADER = 'Basic ' + Buffer.from(WP_USER + ':' + WP_PASS).toString('base64');

const jobs = [
  { id: 165, path: 'C:\\Users\\Mahad\\.gemini\\antigravity\\brain\\bf66fce3-32c6-4f0f-90ea-a6954113ea0c\\content_marketing_1787291907144.jpg' },
  { id: 164, path: 'C:\\Users\\Mahad\\.gemini\\antigravity\\brain\\bf66fce3-32c6-4f0f-90ea-a6954113ea0c\\link_building_1787291930862.jpg' },
  { id: 163, path: 'C:\\Users\\Mahad\\.gemini\\antigravity\\brain\\bf66fce3-32c6-4f0f-90ea-a6954113ea0c\\accessibility_1787291940918.jpg' },
  { id: 162, path: 'C:\\Users\\Mahad\\.gemini\\antigravity\\brain\\bf66fce3-32c6-4f0f-90ea-a6954113ea0c\\headless_cms_1787291952173.jpg' },
  { id: 161, path: 'C:\\Users\\Mahad\\.gemini\\antigravity\\brain\\bf66fce3-32c6-4f0f-90ea-a6954113ea0c\\social_media_1787291963330.jpg' },
  { id: 160, path: 'C:\\Users\\Mahad\\.gemini\\antigravity\\brain\\bf66fce3-32c6-4f0f-90ea-a6954113ea0c\\seo_guide_1787291973377.jpg' }
];

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
  const data = await res.json();
  return data.id;
}

async function attachMedia(postId, mediaId) {
  const res = await fetch(WP_URL + '/wp-json/wp/v2/posts/' + postId, {
    method: 'POST',
    headers: {
      'Authorization': AUTH_HEADER,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ featured_media: mediaId })
  });
  console.log('Post', postId, 'attached media', mediaId, 'status', res.status);
}

async function process() {
  for (const job of jobs) {
    console.log('Processing post', job.id);
    try {
      const mediaId = await uploadImage(job.path);
      console.log('Uploaded image, got media ID:', mediaId);
      await attachMedia(job.id, mediaId);
    } catch (e) {
      console.error('Error on post', job.id, e.message);
    }
  }
}

process();
