const fs = require('fs');
const path = require('path');

const WP_URL = 'https://wp.zenvix.net';
const WP_USER = 'zenvix-maigration-2';
const WP_PASS = '9Z8u ZmBk SdZz KEDl 05yc w8cm';
const AUTH_HEADER = 'Basic ' + Buffer.from(WP_USER + ':' + WP_PASS).toString('base64');

const jobs = [
  { id: null, title: 'Momin Ali', slug: 'momin-ali', acf: { role: 'Link building & outreach specialist', display_order: '5' }, image: 'C:\\Users\\Mahad\\.gemini\\antigravity\\brain\\bf66fce3-32c6-4f0f-90ea-a6954113ea0c\\.user_uploaded\\media_1787490721730.jpg' },
  { id: null, title: 'Afnan Rashid', slug: 'afnan-rashid', acf: { role: 'Seo on page & outreach specialist', display_order: '6' }, image: 'C:\\Users\\Mahad\\.gemini\\antigravity\\brain\\bf66fce3-32c6-4f0f-90ea-a6954113ea0c\\.user_uploaded\\media_1787490721772.jpg' },
  { id: null, title: 'Subhan Mather', slug: 'subhan-mather', acf: { role: 'Seo off page & graphic designing specialist', display_order: '7' }, image: 'C:\\Users\\Mahad\\.gemini\\antigravity\\brain\\bf66fce3-32c6-4f0f-90ea-a6954113ea0c\\.user_uploaded\\media_1787490721929.jpg' },
  { id: 147, title: 'Umar Maqsood', slug: 'umar-maqsood', acf: null, image: 'C:\\Users\\Mahad\\.gemini\\antigravity\\brain\\bf66fce3-32c6-4f0f-90ea-a6954113ea0c\\.user_uploaded\\media_1787490721860.jpg' },
  { id: 146, title: 'Muhammad Umar Tahir', slug: 'muhammad-umar-tahir', acf: null, image: 'C:\\Users\\Mahad\\.gemini\\antigravity\\brain\\bf66fce3-32c6-4f0f-90ea-a6954113ea0c\\.user_uploaded\\media_1787490721891.jpg' }
];

async function deletePost(postId) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/team/${postId}?force=true`, {
    method: 'DELETE',
    headers: { 'Authorization': AUTH_HEADER }
  });
  console.log(`Deleted post ${postId}, status: ${res.status}`);
}

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

async function createOrUpdateTeamMember(job, mediaId) {
  const url = job.id ? `${WP_URL}/wp-json/wp/v2/team/${job.id}` : `${WP_URL}/wp-json/wp/v2/team`;
  
  const payload = {
    title: job.title,
    status: 'publish',
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
  console.log(`Saved team member ${job.title}, status: ${res.status}, ID: ${data.id}`);
}

async function process() {
  // Delete Director (id 148)
  try {
    await deletePost(148);
  } catch (e) {
    console.log('Could not delete 148');
  }

  for (const job of jobs) {
    console.log('Processing:', job.title);
    try {
      const mediaId = await uploadImage(job.image);
      console.log('Uploaded image, got media ID:', mediaId);
      await createOrUpdateTeamMember(job, mediaId);
    } catch (e) {
      console.error('Error on', job.title, e.message);
    }
  }
}

process();
