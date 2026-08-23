

const WP_URL = 'https://wp.zenvix.net';
const WP_USER = 'zenvix-maigration-2';
const WP_PASS = '9Z8u ZmBk SdZz KEDl 05yc w8cm';
const AUTH_HEADER = 'Basic ' + Buffer.from(WP_USER + ':' + WP_PASS).toString('base64');

async function updateCeo() {
  const url = `${WP_URL}/wp-json/wp/v2/team/146`;
  
  const payload = {
    acf: {
      role: 'CEO',
      short_bio: "As the Chief Executive Officer at Zenvix, Muhammad Umar Tahir drives the strategic vision and executive direction of the agency. With a profound understanding of the ever-evolving digital landscape, he ensures that every digital solution we deliver aligns seamlessly with our clients' long-term business growth objectives. Under his leadership, Zenvix has cultivated a culture of innovation, excellence, and unwavering commitment to client success, continuously pushing the boundaries of what is possible in web development, design, and digital marketing.",
      display_order: 1
    }
  };
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': AUTH_HEADER,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  
  const data = await res.json();
  console.log(`Updated CEO bio, status: ${res.status}`);
}

updateCeo();
