const WP_URL = 'https://wp.zenvix.net';

async function process() {
  try {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/team?per_page=100`);
    const members = await res.json();
    members.forEach(m => {
      console.log(`ID: ${m.id}, Title: ${m.title.rendered}, Role: ${m.acf?.role}`);
    });
  } catch (e) {
    console.error(e);
  }
}
process();
