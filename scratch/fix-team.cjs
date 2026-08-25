const WP_URL = 'https://wp.zenvix.net';
const WP_USER = 'zenvix-maigration-2';
const WP_PASS = '9Z8u ZmBk SdZz KEDl 05yc w8cm';
const AUTH_HEADER = 'Basic ' + Buffer.from(WP_USER + ':' + WP_PASS).toString('base64');

const descriptions = {
  'Momin Ali': 'Specializing in building high-quality backlink profiles and executing strategic outreach campaigns to enhance domain authority and organic visibility.',
  'Afnan Rashid': 'Driving on-page optimization strategies and targeted outreach to maximize search engine rankings and improve user engagement.',
  'Subhan Mather': 'Combining creative graphic design with effective off-page SEO techniques to build compelling brand narratives and drive external authority.',
  'Hassan Asghar': 'Executing comprehensive SEO strategies across technical, on-page, and off-page initiatives to ensure maximum search visibility and sustainable growth.'
};

async function process() {
  try {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/team?per_page=100`);
    const members = await res.json();
    
    const byTitle = {};
    for (const m of members) {
      const title = m.title.rendered;
      if (!byTitle[title]) byTitle[title] = [];
      byTitle[title].push(m);
    }
    
    for (const [title, copies] of Object.entries(byTitle)) {
      // Sort by ID descending so we keep the newest
      copies.sort((a, b) => b.id - a.id);
      
      const toKeep = copies[0];
      const toDelete = copies.slice(1);
      
      // Delete duplicates
      for (const m of toDelete) {
        console.log(`Deleting duplicate ${title} (ID: ${m.id})`);
        const delRes = await fetch(`${WP_URL}/wp-json/wp/v2/team/${m.id}?force=true`, {
          method: 'DELETE',
          headers: { 'Authorization': AUTH_HEADER }
        });
        if (!delRes.ok) console.error(`Failed to delete ${m.id}`);
      }
      
      // Update description if needed
      if (descriptions[title]) {
        console.log(`Updating description for ${title} (ID: ${toKeep.id})`);
        // The bio might be in acf.bio or acf.short_bio depending on setup.
        // Let's check `src/services/wordpress/team.js` - it uses `wpMember.acf?.short_bio || wpMember.acf?.bio`.
        const currentAcf = toKeep.acf || {};
        const updateRes = await fetch(`${WP_URL}/wp-json/wp/v2/team/${toKeep.id}`, {
          method: 'POST',
          headers: { 
            'Authorization': AUTH_HEADER,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            acf: {
              ...currentAcf,
              bio: descriptions[title],
              short_bio: descriptions[title]
            }
          })
        });
        if (!updateRes.ok) console.error(`Failed to update ${toKeep.id}:`, await updateRes.text());
        else console.log(`Successfully updated ${title}`);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

process();
