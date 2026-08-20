import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');

let WP_URL = '';
let WP_USER = '';
let WP_PASS = '';

envContent.split('\n').forEach(line => {
  if (line.startsWith('VITE_WORDPRESS_URL=')) WP_URL = line.split('=')[1].trim();
  if (line.startsWith('WP_MIGRATION_USER=')) WP_USER = line.split('=')[1].trim();
  if (line.startsWith('WP_MIGRATION_APP_PASSWORD=')) WP_PASS = line.substring(line.indexOf('=') + 1).trim();
});

const AUTH_HEADER = 'Basic ' + Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');

async function wpFetch(endpoint, method = 'GET', body = null, isFormData = false) {
  const url = `${WP_URL}/wp-json/wp/v2/${endpoint}`;
  const headers = {
    'Authorization': AUTH_HEADER
  };
  
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const options = { method, headers };
  if (body) {
    options.body = isFormData ? body : JSON.stringify(body);
  }

  const res = await fetch(url, options);
  const text = await res.text();
  try {
    return { status: res.status, data: JSON.parse(text) };
  } catch(e) {
    return { status: res.status, error: text };
  }
}

async function uploadImage(localImagePath) {
  const fullPath = path.resolve(__dirname, '..', 'public', localImagePath.replace(/^\//, ''));
  if (!fs.existsSync(fullPath)) {
    console.error(`  -> Image not found locally: ${fullPath}`);
    return null;
  }
  
  const fileBuffer = fs.readFileSync(fullPath);
  const filename = path.basename(fullPath);
  
  console.log(`  -> Uploading image ${filename}...`);
  
  const url = `${WP_URL}/wp-json/wp/v2/media`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': AUTH_HEADER,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': 'image/jpeg' // assuming jpeg for these files
    },
    body: fileBuffer
  });
  
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    if (res.status === 201 && data.id) {
      return data.id;
    }
    console.error('  -> Failed to upload image', res.status, data);
  } catch(e) {
    console.error('  -> Failed to upload image', res.status, text);
  }
  return null;
}

// Map from category name to ID
const CATEGORIES = {
  'Branding': 13,
  'Business': 12,
  'Digital Marketing': 10,
  'SEO': 9,
  'Social Media': 14,
  'UI/UX': 11,
  'Web Development': 8
};
const AUTHOR_ID = 1; // Zenvix Editorial

import { services } from '../src/data/services.js';
import { portfolioData } from '../src/data/portfolio.js';
import { teamData } from '../src/data/team.js';
import { blogData } from '../src/data/blog.js';

async function migrate() {
  console.log("=== Starting WordPress Migration ===\n");

  // 1. SERVICES (Update only)
  console.log("--- Migrating Services ---");
  const existingServicesRes = await wpFetch('services?per_page=100');
  const existingServices = existingServicesRes.data || [];
  
  for (const local of services) {
    const existing = existingServices.find(s => s.slug === local.id);
    if (existing) {
      console.log(`Updating Service: ${local.id} (ID: ${existing.id})`);
      const body = {
        title: local.title,
        acf: {
          shortTitle: local.shortTitle,
          description: local.description,
          capabilities: local.capabilities.join('\r\n')
        }
      };
      const res = await wpFetch(`services/${existing.id}`, 'POST', body);
      if (res.status === 200) {
        console.log(`  -> Success!`);
      } else {
        console.log(`  -> Failed! ${res.status}`);
      }
    } else {
      console.log(`Service ${local.id} not found in WP. Skipping per constraints.`);
    }
  }

  // 2. PORTFOLIO
  console.log("\n--- Migrating Portfolio ---");
  const existingPortfolioRes = await wpFetch('portfolio?per_page=100');
  const existingPortfolio = existingPortfolioRes.data || [];
  
  for (const local of portfolioData) {
    const existing = existingPortfolio.find(p => p.slug === local.slug);
    if (!existing) {
      console.log(`Creating Portfolio: ${local.slug}`);
      
      let mediaId = null;
      if (local.image) {
        mediaId = await uploadImage(local.image);
      }
      
      const body = {
        title: local.title,
        slug: local.slug,
        status: 'publish',
        acf: {
          category: local.category,
          services: local.services.join('\r\n'),
          challenge: local.challenge,
          approach: local.approach,
          solution: local.solution,
          outcome: local.outcome,
          link: local.link,
          placeholderColors: local.placeholderColors,
          placeholderType: local.placeholderType
        }
      };
      if (mediaId) {
        body.featured_media = mediaId;
      }
      
      const res = await wpFetch('portfolio', 'POST', body);
      if (res.status === 201) {
        console.log(`  -> Success! Created ID: ${res.data.id}`);
      } else {
        console.log(`  -> Failed! ${res.status} ${res.error}`);
      }
    } else {
      console.log(`Portfolio ${local.slug} already exists. Skipping.`);
    }
  }

  // 3. TEAM
  console.log("\n--- Migrating Team ---");
  const existingTeamRes = await wpFetch('team?per_page=100');
  const existingTeam = existingTeamRes.data || [];
  
  for (const local of teamData) {
    const slug = local.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = existingTeam.find(t => t.slug === slug);
    
    const body = {
      title: local.name,
      slug: slug,
      status: 'publish',
      acf: {
        role: local.role,
        bio: local.bio
      }
    };

    if (existing) {
      console.log(`Updating Team: ${slug} (ID: ${existing.id})`);
      const res = await wpFetch(`team/${existing.id}`, 'POST', body);
      if (res.status === 200) console.log(`  -> Success!`);
      else console.log(`  -> Failed! ${res.status}`);
    } else {
      console.log(`Creating Team: ${slug}`);
      const res = await wpFetch('team', 'POST', body);
      if (res.status === 201) console.log(`  -> Success! Created ID: ${res.data.id}`);
      else console.log(`  -> Failed! ${res.status}`);
    }
  }

  // 4. BLOG
  console.log("\n--- Migrating Blog ---");
  const existingBlogRes = await wpFetch('posts?per_page=100');
  const existingBlog = existingBlogRes.data || [];
  
  for (const local of blogData) {
    const existing = existingBlog.find(p => p.slug === local.slug);
    
    // Convert content blocks to HTML
    let htmlContent = '';
    local.content.forEach(block => {
      if (block.type === 'paragraph') htmlContent += `<p>${block.text}</p>`;
      if (block.type === 'heading') htmlContent += `<h${block.level}>${block.text}</h${block.level}>`;
      if (block.type === 'list') {
        htmlContent += `<ul>${block.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
      }
    });

    const catId = CATEGORIES[local.category];
    if (!catId) {
      console.log(`Category ${local.category} not found for post ${local.slug}! Skipping.`);
      continue;
    }

    const body = {
      title: local.title,
      slug: local.slug,
      status: 'publish',
      content: htmlContent,
      excerpt: local.excerpt,
      author: AUTHOR_ID,
      categories: [catId],
      acf: {
        readTime: local.readTime,
        featured: local.featured,
        placeholderType: local.placeholderType,
        placeholderColors: local.placeholderColors
      }
    };

    if (existing) {
      console.log(`Updating Post: ${local.slug} (ID: ${existing.id})`);
      const res = await wpFetch(`posts/${existing.id}`, 'POST', body);
      if (res.status === 200) console.log(`  -> Success!`);
      else console.log(`  -> Failed! ${res.status}`);
    } else {
      console.log(`Creating Post: ${local.slug}`);
      
      let mediaId = null;
      if (local.image) {
        mediaId = await uploadImage(local.image);
      }
      if (mediaId) {
        body.featured_media = mediaId;
      }

      const res = await wpFetch('posts', 'POST', body);
      if (res.status === 201) console.log(`  -> Success! Created ID: ${res.data.id}`);
      else console.log(`  -> Failed! ${res.status}`);
    }
  }
}

migrate();
