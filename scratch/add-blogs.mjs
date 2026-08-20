import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');

let WP_USER = '';
let WP_PASS = '';
let WP_URL = 'https://wp.zenvix.net';

envContent.split('\n').forEach(line => {
  if (line.startsWith('WP_MIGRATION_USER=')) WP_USER = line.split('=')[1].trim();
  if (line.startsWith('WP_MIGRATION_APP_PASSWORD=')) WP_PASS = line.substring(line.indexOf('=') + 1).trim();
});

const AUTH_HEADER = 'Basic ' + Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');
const AUTHOR_ID = 1; // Zenvix Editorial

const CATEGORIES = {
  'Branding': 13,
  'Business': 12,
  'Digital Marketing': 10,
  'SEO': 9,
  'Social Media': 14,
  'UI/UX': 11,
  'Web Development': 8
};

const newBlogs = [
  {
    title: "The Ultimate Guide to On-Page SEO in 2026",
    slug: "ultimate-guide-on-page-seo-2026",
    category: "SEO",
    readTime: "6 min read",
    excerpt: "Discover the latest on-page SEO strategies to optimize your website for modern search engine algorithms and maximize your organic traffic.",
    content: `
      <h2>Why On-Page SEO Still Matters</h2>
      <p>While off-page signals like backlinks remain crucial, on-page SEO forms the foundation of your search engine visibility. If search engines can't understand your content, no amount of link building will save it.</p>
      <h2>Key On-Page Elements to Optimize</h2>
      <ul>
        <li><strong>Title Tags & Meta Descriptions:</strong> Write compelling, keyword-rich titles that drive click-through rates.</li>
        <li><strong>Header Tags (H1, H2, H3):</strong> Structure your content logically. Ensure your H1 accurately reflects the page's main topic.</li>
        <li><strong>Internal Linking:</strong> Distribute page authority and help users navigate your site effectively.</li>
      </ul>
      <h2>User Intent is King</h2>
      <p>Modern search algorithms focus heavily on satisfying user intent. Ensure your content directly answers the query the user searched for.</p>
    `
  },
  {
    title: "Mastering Social Media Marketing for Local Businesses",
    slug: "mastering-social-media-marketing-local-businesses",
    category: "Social Media",
    readTime: "5 min read",
    excerpt: "Learn how local businesses can leverage social media platforms to build community, engage customers, and drive foot traffic.",
    content: `
      <h2>Choosing the Right Platforms</h2>
      <p>Not every business needs to be on every platform. For local businesses, visually-driven platforms like Instagram and community-focused spaces like Facebook often yield the highest ROI.</p>
      <h2>Engaging with Your Local Community</h2>
      <ul>
        <li><strong>Local Hashtags:</strong> Use location-specific hashtags to increase visibility among nearby users.</li>
        <li><strong>Behind-the-Scenes Content:</strong> Show the human side of your business. Introduce your team and your daily operations.</li>
        <li><strong>User-Generated Content:</strong> Encourage customers to tag your business and share their experiences.</li>
      </ul>
      <p>Consistency in posting and authentic engagement are the keys to long-term social media success.</p>
    `
  },
  {
    title: "Why Headless CMS is the Future of Web Development",
    slug: "headless-cms-future-web-development",
    category: "Web Development",
    readTime: "7 min read",
    excerpt: "Explore the architectural shift towards Headless CMS and why it offers unparalleled flexibility and performance for modern websites.",
    content: `
      <h2>The Limitations of Traditional CMS</h2>
      <p>Traditional monolithic CMS platforms tightly couple the backend content repository with the frontend presentation layer. This can lead to bloated code, slower load times, and limited flexibility in how content is displayed across different devices.</p>
      <h2>Enter the Headless CMS</h2>
      <p>A Headless CMS decouples the backend from the frontend. Content is delivered via APIs (like REST or GraphQL), allowing developers to build the presentation layer using any modern framework like React, Vue, or Angular.</p>
      <h2>Key Benefits</h2>
      <ul>
        <li><strong>Omnichannel Delivery:</strong> Publish content once and display it anywhere—on a website, mobile app, or smartwatch.</li>
        <li><strong>Enhanced Performance:</strong> Frontend frameworks can render pages significantly faster without backend rendering overhead.</li>
        <li><strong>Developer Freedom:</strong> Developers are no longer restricted to the templating languages of traditional platforms.</li>
      </ul>
    `
  },
  {
    title: "Designing for Accessibility: A UI/UX Imperative",
    slug: "designing-for-accessibility-ui-ux",
    category: "UI/UX",
    readTime: "5 min read",
    excerpt: "Web accessibility is no longer optional. Learn how inclusive design practices improve user experience for everyone.",
    content: `
      <h2>What is Web Accessibility?</h2>
      <p>Web accessibility ensures that websites and applications can be used by people of all abilities and disabilities. This includes visual, auditory, physical, speech, cognitive, and neurological disabilities.</p>
      <h2>Crucial Accessibility Principles</h2>
      <ul>
        <li><strong>Color Contrast:</strong> Ensure sufficient contrast between text and background colors for users with low vision or color blindness.</li>
        <li><strong>Keyboard Navigation:</strong> All interactive elements must be fully functional using only a keyboard.</li>
        <li><strong>Meaningful Alt Text:</strong> Provide descriptive alternative text for all meaningful images.</li>
      </ul>
      <p>Designing with accessibility in mind doesn't just help those with disabilities; it creates a clearer, more logical user experience for all users.</p>
    `
  },
  {
    title: "Guest Posting and Link Building Strategies That Actually Work",
    slug: "guest-posting-link-building-strategies",
    category: "SEO",
    readTime: "8 min read",
    excerpt: "A comprehensive guide to ethical, high-impact guest posting and link-building tactics to boost your domain authority.",
    content: `
      <h2>Quality Over Quantity</h2>
      <p>In the modern SEO landscape, a single backlink from a highly authoritative, relevant domain is worth significantly more than hundreds of low-quality links.</p>
      <h2>Effective Guest Posting</h2>
      <p>Guest posting should focus on providing genuine value to the host blog's audience. Pitch highly relevant, well-researched topics rather than generic content.</p>
      <h2>Alternative Link Building Tactics</h2>
      <ul>
        <li><strong>Broken Link Building:</strong> Find broken links on target websites and suggest your content as a replacement.</li>
        <li><strong>Digital PR:</strong> Create data-driven, newsworthy content that journalists and bloggers naturally want to cite.</li>
        <li><strong>Resource Page Link Building:</strong> Reach out to curated resource pages in your industry and request inclusion.</li>
      </ul>
    `
  },
  {
    title: "Creating a Content Marketing Funnel That Converts",
    slug: "content-marketing-funnel-converts",
    category: "Digital Marketing",
    readTime: "6 min read",
    excerpt: "Map your content to the buyer's journey to effectively nurture leads from awareness to conversion.",
    content: `
      <h2>The Stages of the Funnel</h2>
      <p>An effective content marketing funnel aligns with the three main stages of the buyer's journey: Top of Funnel (Awareness), Middle of Funnel (Consideration), and Bottom of Funnel (Decision).</p>
      <h2>Top of Funnel (TOFU)</h2>
      <p>Focus on educational, problem-solving content. Blog posts, social media updates, and informative videos work best here. The goal is to attract a broad audience.</p>
      <h2>Middle of Funnel (MOFU)</h2>
      <p>Here, prospects are evaluating solutions. Provide deeper value through case studies, webinars, and comprehensive guides. Capture leads in exchange for this premium content.</p>
      <h2>Bottom of Funnel (BOFU)</h2>
      <p>Provide the final nudge. Product demonstrations, free trials, and targeted consultations help prospects make the final purchasing decision.</p>
    `
  }
];

async function addBlogs() {
  console.log("=== Adding 6 New Blog Posts ===\n");

  for (const post of newBlogs) {
    console.log(`Creating Post: ${post.title}`);
    
    const body = {
      title: post.title,
      slug: post.slug,
      status: 'publish',
      content: post.content,
      excerpt: post.excerpt,
      author: AUTHOR_ID,
      categories: [CATEGORIES[post.category]],
      acf: {
        readTime: post.readTime,
        featured: false,
        placeholderType: 'gradient',
        placeholderColors: 'from-blue-500 to-indigo-500'
      }
    };

    try {
      const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts`, {
        method: 'POST',
        headers: {
          'Authorization': AUTH_HEADER,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      if (res.status === 201) {
        console.log(`  -> Success! Created ID: ${data.id}`);
      } else {
        console.log(`  -> Failed! ${res.status}`, data);
      }
    } catch(e) {
      console.log(`  -> Error: ${e.message}`);
    }
  }
}

addBlogs();
