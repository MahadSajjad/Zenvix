import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { GlobalCTA } from '../components/ui/GlobalCTA';
import { BlogCard, renderBlogPlaceholderVisual } from '../components/ui/BlogCard';
import { blogData } from '../data/blog';

// Helper to render the structured JSON content model safely
const renderContentBlock = (block, index) => {
  switch (block.type) {
    case 'heading':
      const Tag = `h${block.level}`;
      return <Tag key={index} className="text-primary font-bold tracking-tight mt-12 mb-6">{block.text}</Tag>;
    case 'paragraph':
      return <p key={index} className="text-gray-600 leading-relaxed mb-6 text-lg">{block.text}</p>;
    case 'list':
      return (
        <ul key={index} className="list-disc pl-6 mb-8 text-gray-600 text-lg space-y-3">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    default:
      return null;
  }
};

export function BlogPost() {
  const { slug } = useParams();
  const post = blogData.find(p => p.slug === slug);

  // 404 State
  if (!post) {
    return (
      <div className="flex-grow flex items-center justify-center py-32 bg-white min-h-screen">
        <Container className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The article you are looking for does not exist or has been removed.
          </p>
          <Link to="/blog">
            <Button variant="primary">Return to Blog</Button>
          </Link>
        </Container>
      </div>
    );
  }

  // Related Articles Logic
  // 1. Filter out current post
  // 2. Prioritize same category
  const otherPosts = blogData.filter(p => p.id !== post.id);
  const sameCategoryPosts = otherPosts.filter(p => p.category === post.category);
  const differentCategoryPosts = otherPosts.filter(p => p.category !== post.category);
  
  // Take up to 2 from same category, fill remainder from different category
  const relatedPosts = [...sameCategoryPosts, ...differentCategoryPosts].slice(0, 2);

  return (
    <article className="w-full pb-20 bg-white">
      {/* HEADER */}
      <header className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gray-50 border-b border-gray-100 text-center">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-gray-500 hover:text-primary transition-colors"
              >
                <FiArrowLeft /> Back to Insights
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-xs font-bold tracking-[0.15em] text-cta uppercase">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-[1.15] tracking-tight mb-8">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="font-bold text-primary">{post.author}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">{post.date}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">{post.readTime}</span>
            </div>
          </motion.div>
        </Container>
      </header>

      {/* FEATURED VISUAL */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 -mt-8 lg:-mt-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full aspect-[16/9] lg:aspect-[21/9] rounded-2xl shadow-xl overflow-hidden bg-gray-100"
        >
          {post.image ? (
            <img src={post.image} alt={post.imageAlt || post.title} className="w-full h-full object-cover" />
          ) : (
            // Pass the post to the shared visual renderer but override styles to fit the massive hero container
            <div className="w-full h-full scale-150 origin-center">
              {renderBlogPlaceholderVisual(post)}
            </div>
          )}
        </motion.div>
      </div>

      {/* READING COLUMN */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-lg prose-headings:text-primary prose-a:text-cta hover:prose-a:text-primary">
            {post.content && post.content.length > 0 ? (
              post.content.map((block, index) => renderContentBlock(block, index))
            ) : (
              <p className="text-gray-500 italic text-center py-20">Content coming soon. This structure is ready for WordPress REST API integration.</p>
            )}
          </div>
        </Container>
      </section>

      {/* RELATED ARTICLES */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gray-50 border-t border-gray-200">
          <Container>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-primary tracking-tight mb-12">
                More from Zenvix
              </h2>
              <div className="flex flex-col">
                {relatedPosts.map(relatedPost => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* FINAL CTA */}
      <GlobalCTA />
    </article>
  );
}
